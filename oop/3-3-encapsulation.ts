{
  /**
   * 외부에서 접근하면 안되는 것(보면 안되는)을 가려버리자 정보은닉!
   *
   */

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public: 지정안하면 디폴트로 퍼블릭임
  // private: 외부에서 볼 수없고 접근 가능
  // protected: 외부에서 접근 불가능하지만, 이 클래스를 상속받은 자식에서만 접근 가능
  class CoffeeMaker {
    // private => 외부에서 직접 변경할 수 없게 함
    // static => 클래스 레벨에서 접근 가능한지, 아니면 클래스를 이용해서 만든 오브젝트로만 접근 가능한지 결정
    // static을 붙인 변수나 함수는 오브젝트를 따로 생성하지 않고도 클래스 이름만으로 접근 가능
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 보통 이렇게 static이라는 것을 붙여서 오브젝트(객체)를 만들 수 있는 함수를 제공한다면
    // 누군가가 이런 생성자를 이용해서 생성하는 것을 금지하기 위해서 만듬
    // 이럴땐 constructor를 private으로 선언해서 객체를 아래 함수를 통해서만 만들 수 있게 만듬
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // 전달 받는 인자가 유효한지 아닌지 검사해서 안정성을 높일 수 있음
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  // 함수를 통해서 객체를 만들 수 있게 구현해놨기 때문에 new 클래스 방식으로 안만들고,
  // 아래처럼 클래스 레벨에서 객체 생성을 할 수 있도록 만듬
  const maker = CoffeeMaker.makeMachine(32);
  // maker.coffeeBeans = -34로 해버리면, 외부에서 나의 오브젝트를 유효하지 않게 할 수 있는 위험이 있다.
  maker.fillCoffeeBeans(32);

  // getter setter
  class User {
    // fullName에 접근할 때마다 새로운 데이터를 만들 수 있다.
    // 최초 생성자에서 fullName을 정의하면 생성자가 호출될 때만 바껴서
    // 나중에 밖에서 user.fullName 바꾸면 최초생성할 때만 바뀜
    // 그래서 멤버변수처럼 사용하지만, 어떤 계산을 해야할 땐 게터세터처럼 만든다.

    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
      }
      this.internalAge = num;
    }
    // 아래처럼 생성자에 private, public등을 바로 생성해두면
    // class 내부에서 멤버변수 따로 작성할 필요가 없다.
    constructor(private firstName: string, public lastName: string) {}
  }

  const user = new User("Steve", "Jobs");
  user.age = 6; // 멤버변수처럼 보이지만 setter를 호출하면서 6으로 업뎃해줌, 그리고 전달된 나이에 대해 유효성 검사 가능
  console.log(user.fullName);
}
