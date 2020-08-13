function *fn() {
  yield 1
  yield 2
  return 3
}

let newFn = fn()
console.log(newFn.next()) // 1
console.log(newFn.next()) // 2
console.log(newFn.next()) // 3