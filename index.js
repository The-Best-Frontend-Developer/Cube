const buttons = document.querySelector('.colors').children
root = document.documentElement
const cubeContainer = document.querySelector('.perspectiveContainer');
const perspectiveBtns = document.querySelector('.perspective').children
const perspectiveValues = ['200px', '300px', '700px', '1000px']
let startX, startY, isDragging;
let currentCubeX = -20;
let currentCubeY = -20;

Array.from(buttons).forEach((el, index) => {
    el.addEventListener('click', () => {
        switch (index) {
            case 0:
                root.style.setProperty('--red', '50');
                root.style.setProperty('--green', '150');
                root.style.setProperty('--blue', '255');
                root.style.setProperty('--mainColor', 'dodgerblue')
                break;
            case 1:
                root.style.setProperty('--red', '255');
                root.style.setProperty('--green', '50');
                root.style.setProperty('--blue', '50');
                root.style.setProperty('--mainColor', 'red')
                break;
            case 2:
                root.style.setProperty('--red', '50');
                root.style.setProperty('--green', '255');
                root.style.setProperty('--blue', '50');
                root.style.setProperty('--mainColor', 'lawngreen')
                break;
            case 3:
                root.style.setProperty('--red', '255');
                root.style.setProperty('--green', '50');
                root.style.setProperty('--blue', '255');
                root.style.setProperty('--mainColor', 'deeppink')
                break;
            case 4:
                root.style.setProperty('--red', '255');
                root.style.setProperty('--green', '255');
                root.style.setProperty('--blue', '50');
                root.style.setProperty('--mainColor', 'yellow')
                break;
        }
    })
})

function handleStart(event) {
    event.preventDefault();
    isDragging = true;

    const touch = event.touches?.[0] || event;
    startX = touch.clientX;
    startY = touch.clientY;
}

function handleMove(event) {
    if (!isDragging) return;

    const touch = event.touches?.[0] || event;
    let deltaX = touch.clientX - startX;
    let deltaY = touch.clientY - startY;

    // Проверяем, в каком положении куб, и меняем направление вращения
    if ((currentCubeX >= 90 && currentCubeX <= 270) || (currentCubeX <= -90 && currentCubeX >= -270)) {
        // Перевёрнутый куб
        currentCubeX -= deltaY * 0.6; // Вращение по оси X
        currentCubeY -= deltaX * 0.6; // Вращение по оси Y
    } else {
        // Стандартное положение куба
        currentCubeX -= deltaY * 0.6; // Вращение по оси X
        currentCubeY += deltaX * 0.6; // Вращение по оси Y
    }

    // Обновляем начальные координаты для следующего движения
    startX = touch.clientX;
    startY = touch.clientY;

    cubeContainer.style.transform = `rotateX(${currentCubeX}deg) rotateY(${currentCubeY}deg)`;
}

function handleEnd() {
    isDragging = false;
}


Array.from(perspectiveBtns).forEach((el, index) => {
    el.addEventListener('click', (event) => {
        Array.from(perspectiveBtns).forEach(button => button.classList.remove('active'));
        el.classList.add('active')
        root.style.setProperty('--perspective', perspectiveValues[index])
    })
})

cubeContainer.addEventListener('touchstart', handleStart);
cubeContainer.addEventListener('touchmove', handleMove);
cubeContainer.addEventListener('touchend', handleEnd);

cubeContainer.addEventListener('mousedown', handleStart);
cubeContainer.addEventListener('mousemove', handleMove);
cubeContainer.addEventListener('mouseup', handleEnd);
cubeContainer.addEventListener('mouseleave', handleEnd);
