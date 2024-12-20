import { Vector2 } from "three";

export const useSquishyCursor = (element: HTMLElement) => {
  const STRETCH_FACTOR = 0.3;
  const STRETCH_VELOCITY = 2;

  const cursor = document.createElement("div");
  cursor.id = "cursor";
  document.body.appendChild(cursor);
  element.style.cursor = "none";

  let mousePosition = new Vector2(0, 0);
  let lastMousePosition = new Vector2(0, 0);
  let cursorPosition = new Vector2(0, 0);
  let velocity = new Vector2(0, 0);

  document.addEventListener("mousemove", (event) => {
    mousePosition = new Vector2(event.clientX, event.clientY);
  });

  function animate() {
    velocity = new Vector2().copy(mousePosition).sub(lastMousePosition);
    lastMousePosition = new Vector2().copy(mousePosition);

    cursorPosition.lerp(mousePosition, 0.5);
    
    let angle = 0;
    let scale = 1;
    if (velocity.length() > STRETCH_VELOCITY) {
      angle = new Vector2().copy(cursorPosition).sub(mousePosition).angle() * (180 / Math.PI);
      scale = 1 + Math.min(Math.abs(velocity.length() - STRETCH_VELOCITY) * STRETCH_FACTOR, 2.5);
    }
   
    cursor.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) rotate(${angle}deg) scale(${scale}, 1)`;

    requestAnimationFrame(animate);
  }

  animate();
}