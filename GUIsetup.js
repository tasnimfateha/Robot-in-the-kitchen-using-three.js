import GUI from 'three/addons/libs/lil-gui.module.min.js';

export function setupGUI(lightParts, robotParts, kitchenParts) {
    const light = lightParts.light;

    const lightGUI = new GUI({
        container: document.getElementById('gui-light')
    });

    const robotGUI = new GUI({
        container: document.getElementById('gui-robot')
    });

    const kitchenGUI = new GUI({
        container: document.getElementById('gui-kitchen')
    });

    // LIGHT GUI
    lightGUI.add(light, 'intensity', 0, 100, 1).name('Spot Light');
    lightGUI.add(light.position, 'x', -20, 20, 0.1).name('Position X');
    lightGUI.add(light.position, 'y', 0, 20, 0.1).name('Position Y');
    lightGUI.add(light.position, 'z', -20, 20, 0.1).name('Position Z');

    // ROBOT GUI
    robotGUI.add(robotParts.robotHead.material, 'metalness', 0, 1).name('Head Metalness');
    robotGUI.add(robotParts.robotTorso.material, 'metalness', 0, 1).name('Torso Metalness');

    // KITCHEN GUI
    kitchenGUI.add(kitchenParts.counter.material, 'metalness', 0, 1).name('Counter');
    kitchenGUI.add(kitchenParts.glass.material, 'opacity', 0, 1).name('Glass');
    kitchenGUI.add(kitchenParts.plate.material, 'metalness', 0, 1).name('Plate');

    setupGUIButtons();
}

function setupGUIButtons() {
    const mainToggle = document.getElementById('main-toggle');
    const subButtons = document.getElementById('sub-buttons');

    const lightBtn = document.getElementById('light-btn');
    const robotBtn = document.getElementById('robot-btn');
    const kitchenBtn = document.getElementById('kitchen-btn');

    const lightBox = document.getElementById('gui-light');
    const robotBox = document.getElementById('gui-robot');
    const kitchenBox = document.getElementById('gui-kitchen');

    mainToggle.addEventListener('click', function () {
        subButtons.classList.toggle('hidden');
    });

    function hideAllPanels() {
        lightBox.classList.add('hidden');
        robotBox.classList.add('hidden');
        kitchenBox.classList.add('hidden');
    }

    lightBtn.addEventListener('click', function () {
        const wasHidden = lightBox.classList.contains('hidden');
        hideAllPanels();

        if (wasHidden) {
            lightBox.classList.remove('hidden');
        }
    });

    robotBtn.addEventListener('click', function () {
        const wasHidden = robotBox.classList.contains('hidden');
        hideAllPanels();

        if (wasHidden) {
            robotBox.classList.remove('hidden');
        }
    });

    kitchenBtn.addEventListener('click', function () {
        const wasHidden = kitchenBox.classList.contains('hidden');
        hideAllPanels();

        if (wasHidden) {
            kitchenBox.classList.remove('hidden');
        }
    });
}

export function setupJointGUI(robotParts, jointAngles) {
    const jointGUI = new GUI({
        container: document.getElementById('gui-joints')
    });

    jointGUI.add(jointAngles, 'armShoulder', -90, 90, 1)
        .name('Shoulder Angle')
        .onChange(function () {
            jointAngles.manualControl = true;
        });

    jointGUI.add(jointAngles, 'armElbow', -90, 90, 1)
        .name('Elbow Angle')
        .onChange(function () {
            jointAngles.manualControl = true;
        });

    setupJointGUIButton(jointAngles);
}

function setupJointGUIButton(jointAngles) {
    const jointToggle = document.getElementById('joint-toggle');
    const jointBox = document.getElementById('gui-joints');

    jointToggle.addEventListener('click', function () {
        jointBox.classList.toggle('hidden');
    });

    const resetBtn = document.createElement('button');
    resetBtn.innerText = "Reset Animation";
    jointBox.appendChild(resetBtn);

    resetBtn.addEventListener('click', function () {
        jointAngles.manualControl = false;
    });
}