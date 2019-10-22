const THREE = require('three')
const dat = require('dat.gui')

class Circle {
  constructor(colors) {
    this.mesh = null
    this.material = null
    this.init(colors)
    this.initGui()
  }

  init(colors) {
    const vertexShader = [
      'varying vec3	vVertexWorldPosition;',
      'varying vec3	vVertexNormal;',
      'varying vec4	vFragColor;',
      'void main(){',
      '	vVertexNormal	= normalize(normalMatrix * normal);', //将法线转换到视图坐标系中
      '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //将顶点转换到世界坐标系中
      '	// set gl_Position',
      '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}'
    ].join('\n')

    THREE.AeroSphere = {
      uniforms: {
        coeficient: {
          type: 'f',
          value: 1.0
        },
        power: {
          type: 'f',
          value: 2
        },
        glowColor: {
          type: 'c',
          value: new THREE.Color(0xffff00)
        }
      },
      vertexShader: vertexShader,
      fragmentShader: [
        'uniform vec3	glowColor;',
        'uniform float	coeficient;',
        'uniform float	power;',

        'varying vec3	vVertexNormal;',
        'varying vec3	vVertexWorldPosition;',

        'varying vec4	vFragColor;',

        'void main(){',
        '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;', //世界坐标系中从相机位置到顶点位置的距离
        '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
        '	viewCameraToVertex	= normalize(viewCameraToVertex);', //规一化
        '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
        '	gl_FragColor		= vec4(glowColor, intensity);',
        '}'
        //vVertexNormal视图坐标系中点的法向量
        //viewCameraToVertex视图坐标系中点到摄像机的距离向量
        //dot点乘得到它们的夹角的cos值
        //从中心向外面角度越来越小（从钝角到锐角）从cos函数也可以知道这个值由负变正，不透明度最终从低到高
      ].join('\n')
    }

    THREE.GlowSphere = {
      uniforms: {
        coeficient: {
          type: 'f',
          value: 0.0
        },
        power: {
          type: 'f',
          value: 1
        },
        glowColor: {
          type: 'c',
          value: new THREE.Color(0xffffff)
        }
      },
      vertexShader: vertexShader,
      fragmentShader: [
        'uniform vec3	glowColor;',
        'uniform float	coeficient;',
        'uniform float	power;',

        'varying vec3	vVertexNormal;',
        'varying vec3	vVertexWorldPosition;',

        'varying vec4	vFragColor;',

        'void main(){',
        '	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;', //世界坐标系中顶点位置到相机位置到的距离
        '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
        '	viewCameraToVertex	= normalize(viewCameraToVertex);', //规一化
        '	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
        '	if(intensity > 0.65){ intensity = 0.0;}',
        '	gl_FragColor		= vec4(glowColor, intensity);',
        '}'
        //viewCameraToVertex视图坐标系中点到摄像机的距离向量
        //dot点乘得到它们的夹角的cos值
        //从中心向外面角度越来越大（从锐角到钝角）从cos函数也可以知道这个值由负变正，不透明度最终从高到低
      ].join('\n')
    }

    // 创建圆
    const geometry = new THREE.SphereGeometry(10, 60, 30)

    // 创建皮肤材质

    const material1 = new THREE.ShaderMaterial({
      uniforms: THREE.AeroSphere.uniforms,
      vertexShader: THREE.AeroSphere.vertexShader,
      fragmentShader: THREE.AeroSphere.fragmentShader,
      blending: THREE.NormalBlending,
      transparent: true,
      depthWrite: false
    })

    const material2 = new THREE.ShaderMaterial({
      uniforms: THREE.GlowSphere.uniforms,
      vertexShader: THREE.GlowSphere.vertexShader,
      fragmentShader: THREE.GlowSphere.fragmentShader,
      blending: THREE.NormalBlending,
      transparent: true
    })

    this.material = new THREE.MeshPhongMaterial({
      color: 0x666666,
      specular: new THREE.Color(0x00ffff),
      specularMap: new THREE.TextureLoader().load('/static/textures/lensflare/earth_specular.jpg'),
      shininess: 10
    })

    this.mesh = new THREE.Mesh(geometry, this.material)
  }
  initGui() {
    //声明一个保存需求修改的相关数据的对象
    const gui = {
      addTexture: () => {
        //添加平面贴图
        this.material.map = new THREE.TextureLoader().load(
          '/static/textures/lensflare/earth_specular.jpg'
        )
        this.material.needsUpdate = true
      },
      addNormal: () => {
        //添加法向量纹理
        this.material.normalMap = new THREE.TextureLoader().load(
          '/static/textures/lensflare/earth_atmos.jpg'
        )
        this.material.needsUpdate = true
      },
      shininess: 10
    }
    var datGui = new dat.GUI()
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.add(gui, 'addTexture')
    datGui.add(gui, 'addNormal')
    datGui.add(gui, 'shininess', 0, 100).onChange(e => {
      this.material.shininess = e
    })
  }
}

export default Circle
