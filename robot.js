import * as THREE from 'three';

// Create one simple hand

/*
   I separated the hand into its own function because the hand has many small parts:
    palm, fingers, and thumb. If I put all of this directly inside the robot() function, the robot code would become
    harder to read. So here I make the hand separately, then attach it to the robot arm later.
*/
function createHand(material) {
    const hand = new THREE.Group();
    hand.position.set(0, -1.2, 0);

    // Palm
    const palm = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.5, 0.4),
        material
    );
    palm.castShadow = true;
    palm.receiveShadow = true;
    hand.add(palm);

    // Four fingers
    const fingerGeometry = new THREE.BoxGeometry(0.1, 0.35, 0.1);
        /*
            When i = 0, finger is placed at -0.24.
            When i = 1, finger is placed at -0.08.
            When i = 2, finger is placed at 0.08.
            When i = 3, finger is placed at 0.24.

            This spreads the fingers across the palm.

            Y = -0.4 moves the fingers downward from the palm.
            Z = 0 keeps them in the center depth.
        */
    for (let i = 0; i < 4; i++) {
        const finger = new THREE.Mesh(fingerGeometry, material);
        finger.position.set(-0.24 + i * 0.16, -0.4, 0);
        finger.castShadow = true;
        finger.receiveShadow = true;
        hand.add(finger);
    }

    // Thumb
    const thumb = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.3, 0.12),
        material
    );
    thumb.position.set(-0.4, -0.05, 0);
    thumb.rotation.z = Math.PI / 4;  // Rotate the thumb a little so it does not look exactly like the fingers.
    thumb.castShadow = true;
    thumb.receiveShadow = true;
    hand.add(thumb);

    return hand;
}

export function robot(scene) {
    const textureLoader = new THREE.TextureLoader();
    const steelTexture = textureLoader.load('image/brushed-metal-texture_1048-7624.jpg');

    const baseMaterial = new THREE.MeshStandardMaterial({ map: steelTexture });
    const torsoMaterial = new THREE.MeshStandardMaterial({ map: steelTexture });
    const grayMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const lightGrayMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const handMaterial = new THREE.MeshStandardMaterial({ color: 0xf1c27d });

    // Robot base

    /*
        2, 2 means the top and bottom radius are the same.
        1 means the base height.
        32 makes the cylinder look smooth.
    */

    const robotBase = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 1, 32),
        baseMaterial
    );
    robotBase.position.set(0, -9, -5);
    robotBase.castShadow = true;
    robotBase.receiveShadow = true;
    scene.add(robotBase);

    // Torso
    const robotTorso = new THREE.Mesh(
        new THREE.BoxGeometry(3, 5, 3),
        torsoMaterial
    );
    /*
        This position is local to robotBase because I add the torso to robotBase.
        That means the torso position starts from the base, not from the whole scene.
        Y = 3 moves the torso above the base.
    */
    robotTorso.position.set(0, 3, 0);
    robotTorso.castShadow = true;
    robotTorso.receiveShadow = true;
    robotBase.add(robotTorso);

    // Head
    const robotHead = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        whiteMaterial
    );
    robotHead.position.set(0, 3.5, 0); // This position is local to the torso.
    robotHead.castShadow = true;
    robotHead.receiveShadow = true;
    robotTorso.add(robotHead);

    // Arm (now only one arm)
    const armShoulder = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        grayMaterial
    );
    armShoulder.position.set(2, 2, 0); // This position is local to the torso.
    armShoulder.castShadow = true;
    armShoulder.receiveShadow = true;
    robotTorso.add(armShoulder);

    // Upper arm
    const armUpper = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.5, 0.8),
        lightGrayMaterial
    );
    /*
        This position is local to armShoulder.

        Y = -1 moves the upper arm downward from the shoulder.

        I tried to keep the arm parts nested under each other, because then
        rotating the shoulder will also rotate the upper arm, elbow, lower arm,
        wrist, and hand.
    */
    armUpper.position.set(0, -1, 0);
    armUpper.castShadow = true;
    armUpper.receiveShadow = true;
    armShoulder.add(armUpper);

    // Elbow
    const armElbow = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        grayMaterial
    );
    armElbow.position.set(0, -1, 0); // This position is local to armUpper.
    armElbow.castShadow = true;
    armElbow.receiveShadow = true;
    armUpper.add(armElbow);

    // Lower arm
    const armLower = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 1.2, 0.7),
        lightGrayMaterial
    );
    armLower.position.set(0, -0.75, 0); // This position is local to the elbow.
    armLower.castShadow = true;
    armLower.receiveShadow = true;
    armElbow.add(armLower);

    // Wrist
    const armWrist = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        grayMaterial
    );
    armWrist.position.set(0, -0.75, 0); // This position is local to the lower arm
    armWrist.castShadow = true;
    armWrist.receiveShadow = true;
    armLower.add(armWrist);

    // Hand
    const armHand = createHand(handMaterial);
    armLower.add(armHand);

    return {
        robotBase,
        robotTorso,
        robotHead,
        armShoulder,
        armUpper,
        armElbow,
        armLower,
        armWrist,
        armHand
    };
}

// Add axes to the arm joints
export function addJointAxes(joint, size = 0.8) {
    const axes = new THREE.AxesHelper(size);
    joint.add(axes);
    return axes;
}

// Add axes to the existing arm joints
export function addJointAxesToRobot(robotParts) {
    addJointAxes(robotParts.armShoulder, 2);
    addJointAxes(robotParts.armElbow, 1);
    addJointAxes(robotParts.armWrist, 0.75);
}