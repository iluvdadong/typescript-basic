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

/**
 * 
 * 추상화 VS 캡슐화
 * 
고양이의 내부 상태 (배고프고, 즐겁고, 기분좋고, 잠오고) 이런것들은 외부에서 설정할 수 있는게 아니예요. 그쵸?
외부에서 함부로 설정할 수 없는 것들을 private와 같은 접근 제어자를 써서 외부에서 볼 수 없도록 만드는것을 정보 은닉, 캡슐화라고 해요.
외부에서 접근이 가능하고, 해도 되고, 필요한 것들만 노출하는것도 정보 은닉, 캡슐화라고 해요 :)
여기서 고양이와 놀아주다 (play)같은 함수만 외부에 노출하는것을 (public으로 설정) 캡슐화라고 해요.
자, 이런 함수를 외부에서 호출이 가능하도록 만든다고 해서 추상화라고 하지는 않아요. 

추상화란, 외부에서 어떤 형태로, 공통적으로 어떻게 이 클래스를 이용하게 할것인가... 이걸 고민하는 단계예요.
아, Cat 고양이는 Play라는 함수가 있어. 그리고 모든 동물 Animal과 놀아 줄 수 있어. 그러니깐 Animal 이라는 부모 클래스를 만들어서 play를 할수 있도록 만들어야지!

class Animal {
    play() {}
}
class Cat extends Animal { }
이렇게 상속을 통해 추상화를 할 수도 있죠 :)
그러면 동물을 상속하는 모든 동물들은 다 놀아 줄 수 있는 동물일까요?
조금 잘못된 추상화 같나요? 그러면 또 이렇게 추상화를 해볼 수 있어요
아, 놀아 줄 수 있는 동물 클래스들이 공통적으로 따라야 하는 함수, 인터페이스는 무엇이 있을까? 아하! Playable 이라는 인터페이스를 만들자

interface Playable {
    play();
}

이제 이 인터페이스를 구현하는 클래스들은 다 놀아줄 수 있는 클래스야!
class Cat implements Playable {
    play() {
       console.log("재밌게 놀아요옹🐱")
    }
}

class Dog implements Playable {
    play() {
       console.log("재밌게 놀아요멍🐶")
    }
}

아하! Cat이랑 Dog랑 놀아줄 수 있는 친구들이군!

class Tiger {

}

아뉘, Tiger는 Playable 인터페이스를 구현하지 않았네!
놀아줄 수 없는 클래스구나!


이런식으로 외부에서 어떻게 이 클래스를 사용할 수 있는지,
인터페이스나 다른 부모 클래스를 통해 공통적인 기능들을 추출하는 이런 작업들을 추상화라고 볼 수 있어요 💡

제 설명이 도움이 되셨으면 좋겠네요 ;)
 */
