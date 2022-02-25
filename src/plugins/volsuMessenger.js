// Нужно подумать, стоит ли это использовать
// Сюда же можно прикрутить обращение к системе нотификаций, сокетов и т.д.

// export default {
//   install: (app, options) => {
//     /*
//       Определяет, принадлежит ли сообщение текущему пользователю.
//       Служит заменой isYourMessage в компонентах
//     */
//     const defineMessageBelonging = (userData, message) => {
//       // Define is it user message or not
//       return false;
//     }

//     app.provide('defineMessageBlonging', defineMessageBelonging);
//   }
// }