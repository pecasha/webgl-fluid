function St(Ee,a){const f=Ee;me();let K=!1,U=null;a={IMMEDIATE:!0,TRIGGER:"hover",AUTO:!1,INTERVAL:3e3,SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:.2,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3,SPLAT_COUNT:Number.parseInt(Math.random()*20,10)+5,SHADING:!0,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!1,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1,...a};function re(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}const D=[],M=[],A=[];D.push(new re);const{gl:e,ext:E}=Re(f);Se()&&(a.DYE_RESOLUTION=512),E.supportLinearFiltering||(a.DYE_RESOLUTION=512,a.SHADING=!1,a.BLOOM=!1,a.SUNRAYS=!1);function Re(t){const i={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let r=t.getContext("webgl2",i);const o=!!r;o||(r=t.getContext("webgl",i)||t.getContext("experimental-webgl",i));let n,c;o?(r.getExtension("EXT_color_buffer_float"),c=r.getExtension("OES_texture_float_linear")):(n=r.getExtension("OES_texture_half_float"),c=r.getExtension("OES_texture_half_float_linear")),r.clearColor(0,0,0,1);const s=o?r.HALF_FLOAT:n.HALF_FLOAT_OES;let v,l,g;return o?(v=_(r,r.RGBA16F,r.RGBA,s),l=_(r,r.RG16F,r.RG,s),g=_(r,r.R16F,r.RED,s)):(v=_(r,r.RGBA,r.RGBA,s),l=_(r,r.RGBA,r.RGBA,s),g=_(r,r.RGBA,r.RGBA,s)),{gl:r,ext:{formatRGBA:v,formatRG:l,formatR:g,halfFloatTexType:s,supportLinearFiltering:c}}}function _(t,i,r,o){if(!pe(t,i,r,o))switch(i){case t.R16F:return _(t,t.RG16F,t.RG,o);case t.RG16F:return _(t,t.RGBA16F,t.RGBA,o);default:return null}return{internalFormat:i,format:r}}function pe(t,i,r,o){const n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,4,4,0,r,o,null);const c=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,c),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0),t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE}function Se(){return/Mobi|Android/i.test(navigator.userAgent)}class ge{constructor(i,r){this.vertexShader=i,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(i){let r=0;for(let n=0;n<i.length;n++)r+=Et(i[n]);let o=this.programs[r];if(!o){const n=h(e.FRAGMENT_SHADER,this.fragmentShaderSource,i);o=ie(this.vertexShader,n),this.programs[r]=o}o!==this.activeProgram&&(this.uniforms=oe(o),this.activeProgram=o)}bind(){e.useProgram(this.activeProgram)}}class T{constructor(i,r){this.uniforms={},this.program=ie(i,r),this.uniforms=oe(this.program)}bind(){e.useProgram(this.program)}}function ie(t,i){const r=e.createProgram();if(e.attachShader(r,t),e.attachShader(r,i),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw e.getProgramInfoLog(r);return r}function oe(t){const i=[],r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<r;o++){const n=e.getActiveUniform(t,o).name;i[n]=e.getUniformLocation(t,n)}return i}function h(t,i,r){i=De(i,r);const o=e.createShader(t);if(e.shaderSource(o,i),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw e.getShaderInfoLog(o);return o}function De(t,i){if(!i)return t;let r="";return i.forEach(o=>{r+=`#define ${o}
`}),r+t}const x=h(e.VERTEX_SHADER,`
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Ae=h(e.VERTEX_SHADER,`
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),_e=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),ye=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),be=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),Ue=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    uniform vec4 color;
    void main () {
        gl_FragColor = color;
    }
`),Le=h(e.FRAGMENT_SHADER,a.TRANSPARENT?`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;
    #define SCALE 25.0
    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
`:`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;
    #define SCALE 25.0
    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),Fe=`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;
    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;
        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif
    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif
    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif
    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,we=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),Oe=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),Ne=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),Pe=h(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),Be=h(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;
    #define ITERATIONS 16
    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;
        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;
        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;
        float color = texture2D(uTexture, vUv).a;
        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }
        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),Ie=h(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),Me=h(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;
    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,E.supportLinearFiltering?null:["MANUAL_FILTERING"]),Ce=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),Ge=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),Xe=h(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
`),ze=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),Ye=h(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),d=(e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(0),t=>{e.bindFramebuffer(e.FRAMEBUFFER,t),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)});let m,u,P,B,R,q,C,ae;const ne=ke(),L=new T(Ae,_e),j=new T(x,ye),G=new T(x,be),Z=new T(x,Ue),ue=new T(x,Le),X=new T(x,we),I=new T(x,Oe),z=new T(x,Ne),se=new T(x,Pe),$=new T(x,Be),y=new T(x,Ie),p=new T(x,Me),J=new T(x,Ce),Q=new T(x,Ge),F=new T(x,Xe),Y=new T(x,ze),H=new T(x,Ye),b=new ge(x,Fe);function ce(){const t=k(a.SIM_RESOLUTION),i=k(a.DYE_RESOLUTION),r=E.halfFloatTexType,o=E.formatRGBA,n=E.formatRG,c=E.formatR,s=E.supportLinearFiltering?e.LINEAR:e.NEAREST;m?m=le(m,i.width,i.height,o.internalFormat,o.format,r,s):m=ee(i.width,i.height,o.internalFormat,o.format,r,s),u?u=le(u,t.width,t.height,n.internalFormat,n.format,r,s):u=ee(t.width,t.height,n.internalFormat,n.format,r,s),P=S(t.width,t.height,c.internalFormat,c.format,r,e.NEAREST),B=S(t.width,t.height,c.internalFormat,c.format,r,e.NEAREST),R=ee(t.width,t.height,c.internalFormat,c.format,r,e.NEAREST),He(),Ve()}function He(){const t=k(a.BLOOM_RESOLUTION),i=E.halfFloatTexType,r=E.formatRGBA,o=E.supportLinearFiltering?e.LINEAR:e.NEAREST;q=S(t.width,t.height,r.internalFormat,r.format,i,o),A.length=0;for(let n=0;n<a.BLOOM_ITERATIONS;n++){const c=t.width>>n+1,s=t.height>>n+1;if(c<2||s<2)break;const v=S(c,s,r.internalFormat,r.format,i,o);A.push(v)}}function Ve(){const t=k(a.SUNRAYS_RESOLUTION),i=E.halfFloatTexType,r=E.formatR,o=E.supportLinearFiltering?e.LINEAR:e.NEAREST;C=S(t.width,t.height,r.internalFormat,r.format,i,o),ae=S(t.width,t.height,r.internalFormat,r.format,i,o)}function S(t,i,r,o,n,c){e.activeTexture(e.TEXTURE0);const s=e.createTexture();e.bindTexture(e.TEXTURE_2D,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,t,i,0,o,n,null);const v=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,v),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.viewport(0,0,t,i),e.clear(e.COLOR_BUFFER_BIT);const l=1/t,g=1/i;return{texture:s,fbo:v,width:t,height:i,texelSizeX:l,texelSizeY:g,attach(N){return e.activeTexture(e.TEXTURE0+N),e.bindTexture(e.TEXTURE_2D,s),N}}}function ee(t,i,r,o,n,c){let s=S(t,i,r,o,n,c),v=S(t,i,r,o,n,c);return{width:t,height:i,texelSizeX:s.texelSizeX,texelSizeY:s.texelSizeY,get read(){return s},set read(l){s=l},get write(){return v},set write(l){v=l},swap(){const l=s;s=v,v=l}}}function We(t,i,r,o,n,c,s){const v=S(i,r,o,n,c,s);return j.bind(),e.uniform1i(j.uniforms.uTexture,t.attach(0)),d(v.fbo),v}function le(t,i,r,o,n,c,s){return t.width===i&&t.height===r||(t.read=We(t.read,i,r,o,n,c,s),t.write=S(i,r,o,n,c,s),t.width=i,t.height=r,t.texelSizeX=1/i,t.texelSizeY=1/r),t}function ke(t){const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texImage2D(e.TEXTURE_2D,0,e.RGB,1,1,0,e.RGB,e.UNSIGNED_BYTE,new Uint8Array([255,255,255]));const r={texture:i,width:1,height:1,attach(n){return e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,i),n}},o=new Image;return o.onload=()=>{r.width=o.width,r.height=o.height,e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o)},r}function Ke(){const t=[];a.SHADING&&t.push("SHADING"),a.BLOOM&&t.push("BLOOM"),a.SUNRAYS&&t.push("SUNRAYS"),b.setKeywords(t)}Ke(),ce(),a.IMMEDIATE&&de(a.SPLAT_COUNT);function fe(){a.AUTO&&a.INTERVAL&&!a.PAUSED&&M.push(a.SPLAT_COUNT),setTimeout(fe,a.INTERVAL)}setTimeout(fe,a.INTERVAL);let ve=Date.now(),V=0;w();function w(){if(K)return;const t=Ze();me()&&ce(),qe()?($e(t),Je(),a.PAUSED||Qe(t),et(),U=requestAnimationFrame(w)):U=null}function qe(){if(M.length>0||a.AUTO)return!0;if(a.TRIGGER==="hover"){if(D.some(i=>i.moved))return!0}else if(a.TRIGGER==="click"&&D.some(i=>i.down||i.moved))return!0;return u.read&&m.read&&je(u.read)}function je(t){return!0}function Ze(){const t=Date.now();let i=(t-ve)/1e3;return i=Math.min(i,.016666),ve=t,i}function me(){const t=O(f.clientWidth),i=O(f.clientHeight);return f.width!==t||f.height!==i?(f.width=t,f.height=i,!0):!1}function $e(t){V+=t*a.COLOR_UPDATE_SPEED,V>=1&&(V=Tt(V,0,1),D.forEach(i=>{i.color=te()}))}function Je(){M.length>0&&de(M.pop()),D.forEach(t=>{t.moved&&(t.moved=!1,ut(t))})}function Qe(t){e.disable(e.BLEND),e.viewport(0,0,u.width,u.height),Q.bind(),e.uniform2f(Q.uniforms.texelSize,u.texelSizeX,u.texelSizeY),e.uniform1i(Q.uniforms.uVelocity,u.read.attach(0)),d(B.fbo),F.bind(),e.uniform2f(F.uniforms.texelSize,u.texelSizeX,u.texelSizeY),e.uniform1i(F.uniforms.uVelocity,u.read.attach(0)),e.uniform1i(F.uniforms.uCurl,B.attach(1)),e.uniform1f(F.uniforms.curl,a.CURL),e.uniform1f(F.uniforms.dt,t),d(u.write.fbo),u.swap(),J.bind(),e.uniform2f(J.uniforms.texelSize,u.texelSizeX,u.texelSizeY),e.uniform1i(J.uniforms.uVelocity,u.read.attach(0)),d(P.fbo),G.bind(),e.uniform1i(G.uniforms.uTexture,R.read.attach(0)),e.uniform1f(G.uniforms.value,a.PRESSURE),d(R.write.fbo),R.swap(),Y.bind(),e.uniform2f(Y.uniforms.texelSize,u.texelSizeX,u.texelSizeY),e.uniform1i(Y.uniforms.uDivergence,P.attach(0));for(let r=0;r<a.PRESSURE_ITERATIONS;r++)e.uniform1i(Y.uniforms.uPressure,R.read.attach(1)),d(R.write.fbo),R.swap();H.bind(),e.uniform2f(H.uniforms.texelSize,u.texelSizeX,u.texelSizeY),e.uniform1i(H.uniforms.uPressure,R.read.attach(0)),e.uniform1i(H.uniforms.uVelocity,u.read.attach(1)),d(u.write.fbo),u.swap(),p.bind(),e.uniform2f(p.uniforms.texelSize,u.texelSizeX,u.texelSizeY),E.supportLinearFiltering||e.uniform2f(p.uniforms.dyeTexelSize,u.texelSizeX,u.texelSizeY);const i=u.read.attach(0);e.uniform1i(p.uniforms.uVelocity,i),e.uniform1i(p.uniforms.uSource,i),e.uniform1f(p.uniforms.dt,t),e.uniform1f(p.uniforms.dissipation,a.VELOCITY_DISSIPATION),d(u.write.fbo),u.swap(),e.viewport(0,0,m.width,m.height),E.supportLinearFiltering||e.uniform2f(p.uniforms.dyeTexelSize,m.texelSizeX,m.texelSizeY),e.uniform1i(p.uniforms.uVelocity,u.read.attach(0)),e.uniform1i(p.uniforms.uSource,m.read.attach(1)),e.uniform1f(p.uniforms.dissipation,a.DENSITY_DISSIPATION),d(m.write.fbo),m.swap()}function et(t){a.BLOOM&&ot(m.read,q),a.SUNRAYS&&(at(m.read,m.write,C),nt(C,ae,1)),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.enable(e.BLEND);const i=e.drawingBufferWidth,r=e.drawingBufferHeight;e.viewport(0,0,i,r);const o=null;a.TRANSPARENT||tt(o,ht(a.BACK_COLOR)),a.TRANSPARENT&&rt(o),it(o,i,r)}function tt(t,i){Z.bind(),e.uniform4f(Z.uniforms.color,i.r,i.g,i.b,1),d(t)}function rt(t){ue.bind(),e.uniform1f(ue.uniforms.aspectRatio,f.width/f.height),d(t)}function it(t,i,r){if(b.bind(),a.SHADING&&e.uniform2f(b.uniforms.texelSize,1/i,1/r),e.uniform1i(b.uniforms.uTexture,m.read.attach(0)),a.BLOOM){e.uniform1i(b.uniforms.uBloom,q.attach(1)),e.uniform1i(b.uniforms.uDithering,ne.attach(2));const o=xt(ne,i,r);e.uniform2f(b.uniforms.ditherScale,o.x,o.y)}a.SUNRAYS&&e.uniform1i(b.uniforms.uSunrays,C.attach(3)),d(t)}function ot(t,i){if(A.length<2)return;let r=i;e.disable(e.BLEND),X.bind();const o=a.BLOOM_THRESHOLD*a.BLOOM_SOFT_KNEE+1e-4,n=a.BLOOM_THRESHOLD-o,c=o*2,s=.25/o;e.uniform3f(X.uniforms.curve,n,c,s),e.uniform1f(X.uniforms.threshold,a.BLOOM_THRESHOLD),e.uniform1i(X.uniforms.uTexture,t.attach(0)),e.viewport(0,0,r.width,r.height),d(r.fbo),I.bind();for(let v=0;v<A.length;v++){const l=A[v];e.uniform2f(I.uniforms.texelSize,r.texelSizeX,r.texelSizeY),e.uniform1i(I.uniforms.uTexture,r.attach(0)),e.viewport(0,0,l.width,l.height),d(l.fbo),r=l}e.blendFunc(e.ONE,e.ONE),e.enable(e.BLEND);for(let v=A.length-2;v>=0;v--){const l=A[v];e.uniform2f(I.uniforms.texelSize,r.texelSizeX,r.texelSizeY),e.uniform1i(I.uniforms.uTexture,r.attach(0)),e.viewport(0,0,l.width,l.height),d(l.fbo),r=l}e.disable(e.BLEND),z.bind(),e.uniform2f(z.uniforms.texelSize,r.texelSizeX,r.texelSizeY),e.uniform1i(z.uniforms.uTexture,r.attach(0)),e.uniform1f(z.uniforms.intensity,a.BLOOM_INTENSITY),e.viewport(0,0,i.width,i.height),d(i.fbo)}function at(t,i,r){e.disable(e.BLEND),se.bind(),e.uniform1i(se.uniforms.uTexture,t.attach(0)),e.viewport(0,0,i.width,i.height),d(i.fbo),$.bind(),e.uniform1f($.uniforms.weight,a.SUNRAYS_WEIGHT),e.uniform1i($.uniforms.uTexture,i.attach(0)),e.viewport(0,0,r.width,r.height),d(r.fbo)}function nt(t,i,r){L.bind();for(let o=0;o<r;o++)e.uniform2f(L.uniforms.texelSize,t.texelSizeX,0),e.uniform1i(L.uniforms.uTexture,t.attach(0)),d(i.fbo),e.uniform2f(L.uniforms.texelSize,0,t.texelSizeY),e.uniform1i(L.uniforms.uTexture,i.attach(0)),d(t.fbo)}function ut(t){const i=t.deltaX*a.SPLAT_FORCE,r=t.deltaY*a.SPLAT_FORCE;he(t.texcoordX,t.texcoordY,i,r,t.color)}function de(t){for(let i=0;i<t;i++){const r=te();r.r*=10,r.g*=10,r.b*=10;const o=Math.random(),n=Math.random(),c=1e3*(Math.random()-.5),s=1e3*(Math.random()-.5);he(o,n,c,s,r)}}function he(t,i,r,o,n){e.viewport(0,0,u.width,u.height),y.bind(),e.uniform1i(y.uniforms.uTarget,u.read.attach(0)),e.uniform1f(y.uniforms.aspectRatio,f.width/f.height),e.uniform2f(y.uniforms.point,t,i),e.uniform3f(y.uniforms.color,r,o,0),e.uniform1f(y.uniforms.radius,st(a.SPLAT_RADIUS/100)),d(u.write.fbo),u.swap(),e.viewport(0,0,m.width,m.height),e.uniform1i(y.uniforms.uTarget,m.read.attach(0)),e.uniform3f(y.uniforms.color,n.r,n.g,n.b),d(m.write.fbo),m.swap()}function st(t){const i=f.width/f.height;return i>1&&(t*=i),t}const Te=t=>{const i=O(t.offsetX),r=O(t.offsetY);let o=D.find(n=>n.id===-1);o||(o=new re),ct(o,-1,i,r),U||w()},W=t=>{const i=O(t.offsetX),r=O(t.offsetY);lt(D[0],i,r),U||w()},xe=()=>{ft(D[0])};a.TRIGGER==="click"?(f.addEventListener("mousedown",Te),f.addEventListener("mousemove",W),window.addEventListener("mouseup",xe)):f.addEventListener("mousemove",W);function ct(t,i,r,o){t.id=i,t.down=!0,t.moved=!1,t.texcoordX=r/f.width,t.texcoordY=1-o/f.height,t.prevTexcoordX=t.texcoordX,t.prevTexcoordY=t.texcoordY,t.deltaX=0,t.deltaY=0,t.color=te()}function lt(t,i,r){a.TRIGGER==="click"&&(t.moved=t.down),t.prevTexcoordX=t.texcoordX,t.prevTexcoordY=t.texcoordY,t.texcoordX=i/f.width,t.texcoordY=1-r/f.height,t.deltaX=vt(t.texcoordX-t.prevTexcoordX),t.deltaY=mt(t.texcoordY-t.prevTexcoordY),a.TRIGGER==="hover"&&(t.moved=Math.abs(t.deltaX)>0||Math.abs(t.deltaY)>0)}function ft(t){t.down=!1}function vt(t){const i=f.width/f.height;return i<1&&(t*=i),t}function mt(t){const i=f.width/f.height;return i>1&&(t/=i),t}function te(){var i;if(((i=a.COLORS)==null?void 0:i.length)>0){const r=Math.floor(Math.random()*a.COLORS.length);return a.COLORS[r]}const t=dt(Math.random(),1,1);return t.r*=.15,t.g*=.15,t.b*=.15,t}function dt(t,i,r){let o,n,c;const s=Math.floor(t*6),v=t*6-s,l=r*(1-i),g=r*(1-v*i),N=r*(1-(1-v)*i);switch(s%6){case 0:o=r,n=N,c=l;break;case 1:o=g,n=r,c=l;break;case 2:o=l,n=r,c=N;break;case 3:o=l,n=g,c=r;break;case 4:o=N,n=l,c=r;break;case 5:o=r,n=l,c=g;break}return{r:o,g:n,b:c}}function ht(t){return{r:t.r/255,g:t.g/255,b:t.b/255}}function Tt(t,i,r){const o=r-i;return(t-i)%o+i}function k(t){let i=e.drawingBufferWidth/e.drawingBufferHeight;i<1&&(i=1/i);const r=Math.round(t),o=Math.round(t*i);return e.drawingBufferWidth>e.drawingBufferHeight?{width:o,height:r}:{width:r,height:o}}function xt(t,i,r){return{x:i/t.width,y:r/t.height}}function O(t){const i=window.devicePixelRatio||1;return Math.floor(t*i)}function Et(t){if(t.length===0)return 0;let i=0;for(let r=0;r<t.length;r++)i=(i<<5)-i+t.charCodeAt(r),i|=0;return i}function Rt(){K||w()}function pt(){var t;K=!0,U&&(cancelAnimationFrame(U),U=null),a.TRIGGER==="click"?(f.removeEventListener("mousedown",Te),f.removeEventListener("mousemove",W),window.removeEventListener("mouseup",xe)):f.removeEventListener("mousemove",W),e&&(m&&(e.deleteTexture(m.read.texture),e.deleteTexture(m.write.texture)),u&&(e.deleteTexture(u.read.texture),e.deleteTexture(u.write.texture)),P&&e.deleteTexture(P.texture),B&&e.deleteTexture(B.texture),R&&(e.deleteTexture(R.read.texture),e.deleteTexture(R.write.texture)),A.forEach(i=>{e.deleteFramebuffer(i.fbo),e.deleteTexture(i.texture)}),e.deleteProgram(L.program),e.deleteProgram(j.program),e.deleteProgram(G.program),e.deleteProgram(Z.program),(t=e.getExtension("WEBGL_lose_context"))==null||t.loseContext())}return{start:Rt,destroy:pt,update:w}}export{St as default};
