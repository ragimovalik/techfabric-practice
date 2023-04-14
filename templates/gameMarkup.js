export function formMarkup() {
  return `<section id="form-box" class="form__wrapper">
        <form name="user-data" class="form flex" id="user-data">
          <div class="form__inputs flex">
            <label for="name"
              >Name:
              <input
                name="name"
                id="name"
                type="text"
                maxlength="20"
                placeholder="your name"
                required
                title="Name should be longer than 2 and less than 20 characters"
              />
              <br />
              <small id="isValid-name"
                >* Name should be longer than 2 and less than 20
                characters</small
              >
            </label>

            <label for="email"
              >Email:
              <input
                name="email"
                id="email"
                type="email"
                placeholder="your email"
                required
              />
            </label>
          </div>

          <input class="form__button" type="submit" value="Start Game" onsubmit="handleSubmit(event)" />
        </form>
      </section>
  `;
}

export const nextLevelCogratsMarkup = (level = 2) => {
  return `
    <h3>Congratulations!</h3>
    <p>New Level Is Open</p>
    <p>Level - ${level}</p>
    <p id="countdown" class="modal__countdown">TIMER</p>`;
};

export const winCongratsMarkup = () => {
  return `
    <h2>Congratulations!</h2>
    <p>You Are The Winner!</p>
    <button type="button" class="modal__button"></button>`;
};
