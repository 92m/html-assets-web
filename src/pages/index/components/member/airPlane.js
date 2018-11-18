const THREE = require('three')

class AirPlane {
    constructor(colors) {
        this.mesh = null
        this.propeller = null
        this.init(colors)
    }
    init(colors) {
        this.mesh = new THREE.Object3D()
        this.mesh.name = "airPlane";
        // 创建机舱
        const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
        const matCockpit = new THREE.MeshPhongMaterial({
            color: colors.red,
            flatShading: true
        })
        // 我们可以通过访问形状中顶点数组中一组特定的顶点
        // 然后移动它的 x, y, z 属性:
        geomCockpit.vertices[4].y-=10;
        geomCockpit.vertices[4].z+=20;
        geomCockpit.vertices[5].y-=10;
        geomCockpit.vertices[5].z-=20;
        geomCockpit.vertices[6].y+=30;
        geomCockpit.vertices[6].z+=20;
        geomCockpit.vertices[7].y+=30;
        geomCockpit.vertices[7].z-=20;

        const cockpit = new THREE.Mesh(geomCockpit, matCockpit)
        cockpit.castShadow = true
        cockpit.receiveShadow = true
        this.mesh.add(cockpit)

        // 创建引擎
        const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        const matEngine = new THREE.MeshPhongMaterial({
            color: colors.white,
            flatShading: true
        });
        const engine = new THREE.Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        // 创建机尾
        const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
        const matTailPlane = new THREE.MeshPhongMaterial({
            color: colors.red,
            flatShading: true
        });
        const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

            // 创建机翼
        const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
        const matSideWing = new THREE.MeshPhongMaterial({
            color: colors.red,
            flatShading: true
        });
        const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);

        // 创建螺旋桨
        const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
        const matPropeller = new THREE.MeshPhongMaterial({
            color: colors.brown,
            flatShading: true
        });
        this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        // 创建螺旋桨的桨叶
        const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
        const matBlade = new THREE.MeshPhongMaterial({
            color: colors.brownDark,
            flatShading: true
        });

        const blade = new THREE.Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);
        this.mesh.add(this.propeller);

        // 创建右轮子组件
        const wheelProtecGeom = new THREE.BoxGeometry(30,15,10,1,1,1);
        const wheelProtecMat = new THREE.MeshPhongMaterial({color:colors.red, flatShading: true});
        const wheelProtecR = new THREE.Mesh(wheelProtecGeom,wheelProtecMat);
        wheelProtecR.position.set(25,-20,25);
        this.mesh.add(wheelProtecR);

        const wheelTireGeom = new THREE.BoxGeometry(24,24,4);
        const wheelTireMat = new THREE.MeshPhongMaterial({color:colors.brownDark, flatShading: true});
        const wheelTireR = new THREE.Mesh(wheelTireGeom,wheelTireMat);
        wheelTireR.position.set(25,-28,25);

        const wheelAxisGeom = new THREE.BoxGeometry(10,10,6);
        const wheelAxisMat = new THREE.MeshPhongMaterial({color:colors.brown, flatShading: true});
        const wheelAxis = new THREE.Mesh(wheelAxisGeom,wheelAxisMat);
        wheelTireR.add(wheelAxis);

        this.mesh.add(wheelTireR);

        // 复制右轮子至左轮子
        const wheelProtecL = wheelProtecR.clone();
        wheelProtecL.position.z = -wheelProtecR.position.z ;
        this.mesh.add(wheelProtecL);

        const wheelTireL = wheelTireR.clone();
        wheelTireL.position.z = -wheelTireR.position.z;
        this.mesh.add(wheelTireL);

        // 复制轮子至后轮子
        const wheelTireB = wheelTireR.clone();
        wheelTireB.scale.set(.5,.5,.5);
        wheelTireB.position.set(-35,-5,0);
        this.mesh.add(wheelTireB);

        // 后轮子组件
        var suspensionGeom = new THREE.BoxGeometry(4,20,4);
        suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0))
        var suspensionMat = new THREE.MeshPhongMaterial({color:colors.red, flatShading: true});
        var suspension = new THREE.Mesh(suspensionGeom,suspensionMat);
        suspension.position.set(-35,-5,0);
        suspension.rotation.z = -.3;
        this.mesh.add(suspension);
    }   

}

export default AirPlane