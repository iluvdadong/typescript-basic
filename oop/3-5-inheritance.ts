{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log("cleaning the machine...🧼");
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up... 🔥");
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots... ☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  /**
   * CoffeeMachine의 생성자 constructor가 private으로 되어있으면 상속이 안된다.
   * 그래서 CoffeeMachine의 생성자는 public이거나 자식만 상속받을 수 있도록 protected으로 변경해야한다.
   *  */
  class CaffeLatteMachine extends CoffeeMachine {
    // 자식 클래스에서 생성자를 만들고싶다면 반드시 super를 호출해줘야 함
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans); //부모에서 받아온 것 그대로 인자로 생성자서 받아오고
      // super로 부모 생성자에 전달해줘야 함
    }
    // 해당 class에서만 쓰는 함수이므로 private으로 선언
    private steamMilk(): void {
      console.log("Steaming some milk... 🥛");
    }
    // override 자식클래스에서 부모클래스에 있는 함수를 덮어 씌우는 것
    // 그대신 makeCoffee 인터페이스 형태 그대로는 따라가야함
    // CoffeeMachine(class)은 CoffeeMaker(interface)를 구현하고
    // CaffeeLatteMachine은 CoffeeMachine을 상속받기 때문에
    // CoffeeMaker(인터페이스)에 선언된 함수 규약을 따라가야함
    makeCoffee(shots: number): CoffeeCup {
      // 부모에 있는 함수를 사용하고 싶다면 super. 으로 부모에서 선언한 함수 호출
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  const machine = new CoffeeMachine(23);
  const latteMachine = new CaffeLatteMachine(23, "SSSS");
  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee);
  console.log(latteMachine.serialNumber);
}
