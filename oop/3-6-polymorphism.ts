{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean; // 옵셔널!
    hasSugar?: boolean; // 옵셔널! sugar가 있을수도 있고 없을수도 있게
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

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log("Steaming some milk... 🥛");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    private addingSugar(): void {
      console.log("Adding Sugar... ✨");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.addingSugar();
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  // CoffeeMaker라는 interface 타입으로도 정의가 가능하고
  // CoffeeMachine이라는 구현부인 class 타입으로도 정의가 가능하다.
  // 그대신 인터페이스 호출시 공개해놓은 makeCoffee() 함수만 호출 가능하다.
  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
  ];

  // 다형성의 장점!
  // 내부적으로 구현된 다양한 class들이 한가지 인터페이스를 구현하거나 동일한 부모를 상속받을 때
  // 공통된 함수 호출 가능 : 약속된 한가지의 api 호출 가능
  machines.forEach((machine) => {
    console.log("-------------------------");
    machine.makeCoffee(1);
  });
}
