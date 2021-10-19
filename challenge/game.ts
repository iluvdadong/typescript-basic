/**
 * Let's make a game 🕹
 */

type Key = "up" | "down" | "left" | "right";
let position = {
  x: 0,
  y: 0,
};
function move(key: Key) {
  switch (key) {
    case "up":
      position.y += 1; //
      break; // 다른 케이스로 넘어가지 않도록 break를 해야함(return이 아니라서!)
    // break를 작성하지 않으면, 다음 케이스문으로 넘어감
    case "down":
      position.y -= 1;
      break;
    case "left":
      position.x -= 1;
      break;
    case "right":
      position.x += 1;
      break;
    default:
      throw new Error(`unknwon key!: ${key}`);
  }
}

console.log(position); // { x: 0, y: 0}

move("up");
console.log(position); // { x: 0, y: 1}

move("down");
console.log(position); // { x: 0, y: 0}

move("left");
console.log(position); // { x: -1, y: 0}

move("right");
console.log(position); // { x: 0, y: 0}
