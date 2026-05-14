import { useEffect, useRef } from 'react'

// Lightweight WebGL fragment shader: drifting fbm noise field with a
// warm-orange / cool-teal palette. Designed for dark sections — sits behind
// content at low opacity. Skips on reduced-motion + falls back gracefully if
// WebGL isn't available.
const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAG = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  // Hash + 2D simplex-ish noise (cheap, stable)
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.07;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.5;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.05;
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
    vec2 r = vec2(
      fbm(p + 2.0 * q + vec2(1.7 + t * 0.5, 9.2)),
      fbm(p + 2.0 * q + vec2(8.3 - t * 0.5, 2.8))
    );
    float f = fbm(p + 1.5 * r);

    vec3 orange = vec3(0.83, 0.42, 0.10);
    vec3 amber  = vec3(0.91, 0.52, 0.19);
    vec3 teal   = vec3(0.18, 0.83, 0.75);
    vec3 cyan   = vec3(0.13, 0.83, 0.93);
    vec3 dark   = vec3(0.047, 0.102, 0.141);

    vec3 col = mix(dark, orange, smoothstep(0.0, 0.6, f));
    col = mix(col, amber, smoothstep(0.5, 0.85, f) * 0.6);
    col = mix(col, teal, length(r) * 0.55);
    col = mix(col, cyan, q.y * 0.18);

    // Vignette
    float vign = smoothstep(1.2, 0.45, length(uv - 0.5));
    col *= vign * 1.05;

    // Soft grain
    float grain = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.04;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function ShaderBackground({ opacity = 0.55, blendMode = 'screen', style }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width * dpr))
      const h = Math.max(1, Math.floor(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let rafId
    let running = true
    const start = performance.now()

    // Pause when offscreen to save GPU time
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          running = e.isIntersecting
          if (running) loop()
        })
      },
      { threshold: 0.01 }
    )
    io.observe(canvas)

    const loop = () => {
      if (!running) return
      const t = (performance.now() - start) / 1000
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      ro.disconnect()
      io.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        mixBlendMode: blendMode,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  )
}
