export default async () => {
  if (window.console && window.console.log) {
    const sansSerif = {
      fontFamily: 'sans-serif',
    }
    console.log(
      `
        %c
        Oh, hey there developer! 🙂

        %c
        Do you want to come and help us build Karrot?

        %c
        Community forum → https://community.foodsaving.world
                   Code → https://github.com/yunity/karrot-frontend
                   Chat → https://chat.karrot.world/channel/karrot-dev
      `.trim().replace(/^ {6}/gm, '').replace(/%c\n/g, '%c'),
      style({
        ...sansSerif,
        fontSize: '28px',
        color: '#F2C037',
      }),
      style({
        ...sansSerif,
        fontSize: '16px',
      }),
      style({
        color: '#888',
      }),
    )
  }

  function style (params) {
    return Object.entries(params).map(([key, value]) => [
      key.replace(/([A-Z])/g, (m, c) => '-' + c.toLowerCase()),
      value,
    ].join(':')).join(';')
  }
}
