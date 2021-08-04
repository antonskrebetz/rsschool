interface UserSettings {
  cardStyle: string,
  dificculty: number,
  sound: boolean,
  registered: boolean,
  firstName: string,
  lastName: string,
  email: string,
}

export const userSettings: UserSettings = {
  cardStyle: 'activities',
  dificculty: 16,
  sound: true,
  registered: false,
  firstName: 'empty',
  lastName: 'empty2',
  email: 'mail'
};
