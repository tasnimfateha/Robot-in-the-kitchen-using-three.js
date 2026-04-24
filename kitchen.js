import * as THREE from 'three';

export function kitchen(scene) {
    // I am using one common texture loader for all textures in the kitchen
    const textureLoader = new THREE.TextureLoader();

    // Floor of the kitchen
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg');
    const floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    // It rotates the floor so it lies flat on the ground
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -10;

    // The floor should receive shadows from other objects
    floor.receiveShadow = true;
    scene.add(floor);

    const wallTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');

    // Wall at the back of the kitchen
    const backWallGeometry = new THREE.BoxGeometry(30, 15, 1);
    const backWallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);

    // It moves the back wall behind the kitchen area
    backWall.position.set(0, -2.5, -15);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left side wall of the kitchen
    const leftWallGeometry = new THREE.BoxGeometry(1, 15, 30);
    const leftWallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);

    // Move the wall to the left side
    leftWall.position.set(-15, -2.5, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Kitchen counter
    const counterGeometry = new THREE.BoxGeometry(15, 5, 3);
    const counterTexture = textureLoader.load('https://threejs.org/examples/textures/disturb.jpg');

    // I used MeshStandard material because it reacts better with light
    const counterMaterial = new THREE.MeshStandardMaterial({
        map: counterTexture,
        metalness: 0.2,
        roughness: 0.6
    });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);

    // Placing the counter above the floor
    counter.position.set(0, -8, 0);
    counter.castShadow = true;
    counter.receiveShadow = true;
    scene.add(counter);

    // Glass
    const glassGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32);

    // I used Transparent to makes the cylinder look more like glass
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        metalness: 0
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);

    // Placing the glass on top of the counter
    glass.position.set(-1.5, -5.2, 0);
    glass.castShadow = true;
    glass.receiveShadow = true;
    scene.add(glass);

    // Plate
    const plateGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.15, 32);
    const plateMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.4,
        metalness: 0
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    // Placing the plate on the counter
    plate.position.set(2, -5.4, 0);
    plate.castShadow = true;
    plate.receiveShadow = true;
    scene.add(plate);

    // Returning all kitchen objects so they can be used later
    return {
        floor,
        backWall,
        leftWall,
        counter,
        glass,
        plate
    };
}