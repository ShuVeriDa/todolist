import {ActionType, div, mult, salaryReducer, StateType, sub, sum} from "./tasks";


test('sum', () => {
   //1. Тестовые данные:
   const salary: number = 800
   const n: number = 200
   //2. Выполнение тестируемого кода:
   const result = sum(salary, n)
   //3. Проверка результата
   expect(result).toBe(1000)
})

test('sub', () => {
   expect(sub(1200, 200)).toBe(1000)
})

test('div', () => {
   expect(div(1500, 500)).toBe(3)
})

test('mult', () => {
   expect(mult(80, 3)).toBe(240)
})

test('case SUM of salaryReducer', () => {
   const salary: StateType = 800
   const action: ActionType = {
      type: "SUM",
      n: 200
   }
   const testAction: ActionType = {
      type: "TEST",
      n: 200
   }

   const result = salaryReducer(salary, action)
   expect(result).toBe(1000)
   expect(salaryReducer(salary, testAction)).toBe(salary)
})

test('case SUB of salaryReducer', () => {
   const salary: StateType = 800
   const action: ActionType = {
      type: "SUB",
      n: 200,
   }

   const testAction: ActionType = {
      type: "TEST",
      n: 200
   }

   const result = salaryReducer(salary, action)
   expect(result).toBe(600)
   expect(salaryReducer(salary, testAction)).toBe(salary)
})

test('case DIV of salaryReducer', () => {
   const salary: StateType = 800
   const action: ActionType = {
      type: 'DIV',
      n: 200
   }

   const testAction: ActionType = {
      type: "TEST",
      n: 200
   }

   const result = salaryReducer(salary, action)
   expect(result).toBe(4)
   expect(salaryReducer(salary, testAction)).toBe(salary)
})

test('case MULT of salaryReducer', () => {
   const salary: StateType = 800
   const action: ActionType = {
      type: "MULT",
      n: 200
   }

   const testAction: ActionType = {
      type: "TEST",
      n: 200
   }

   const result = salaryReducer(salary, action)
   expect(result).toBe(160000)
   expect(salaryReducer(salary, testAction)).toBe(salary)

})