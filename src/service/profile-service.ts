import { ProfileInfo } from '../model/profile';
import { DoubtStatus, MaritalStatus } from '../model/common';
import { fetchServer } from './fetch-server';

const profileMockData: ProfileInfo[]= [
  {
    id: '1',
    firstName: { value: 'Сиргей', status: DoubtStatus.WARN, message: 'Возможная орфографическая ошибка' },
    secondName: { value: 'Иванов', status: DoubtStatus.OK },
    middleName: { value: 'Иванович', status: DoubtStatus.OK },
    birthDate: { value: '24.08.1993', status: DoubtStatus.OK },
    passSeries: { value: '3204', status: DoubtStatus.OK },
    passNumber: { value: '123456', status: DoubtStatus.OK },
    registrationAddress: { value: 'г. Москва', status: DoubtStatus.OK },
    residenceAddress: { value: 'г. Москва', status: DoubtStatus.OK },
    maritalStatus: { value: MaritalStatus.MARRIED, status: DoubtStatus.WARN, message: 'Отсутствует подтверждение' },
    haveChildren: { value: true, status: DoubtStatus.OK },
    jobPlace: { value: 'ООО "СЗВД Тайга"', status: DoubtStatus.OK },
    jobExperience: { value: '12 лет и 3 мес.', status: DoubtStatus.OK },
    jobPosition: { value: 'Генеральный директор', status: DoubtStatus.OK },
    monthOfficialIncome: { value: 175615.27, status: DoubtStatus.OK },
    incomeDocument: { value: '2-НДФЛ', status: DoubtStatus.OK },
    monthAdditionalIncome: { value: 23350, status: DoubtStatus.OK },
    isAdditionalIncomeApproved: { value: false, status: DoubtStatus.WARN, message: 'Не подтвержденный доход' },
    additionalIncomeSource: { value: 'Доходы от оказания консалтинговых услуг', status: DoubtStatus.OK },
    haveBankSavings: { value: false, status: DoubtStatus.WARN, message: 'Не имеет сбережений' },
  },
  {
    id: '2',
    firstName: { value: 'Аркадий', status: DoubtStatus.OK },
    secondName: { value: 'Перфильев', status: DoubtStatus.OK },
    middleName: { value: 'Васильевич', status: DoubtStatus.OK },
    birthDate: { value: '5.12.1972', status: DoubtStatus.OK },
    passSeries: { value: '5803', status: DoubtStatus.OK },
    passNumber: { value: '562234', status: DoubtStatus.OK },
    registrationAddress: { value: 'село Корсино', status: DoubtStatus.WARN, message: 'Неопределенный адрес' },
    residenceAddress: { value: 'г. Омск', status: DoubtStatus.OK },
    maritalStatus: { value: MaritalStatus.DIVORCED, status: DoubtStatus.OK },
    haveChildren: { value: true, status: DoubtStatus.OK },
    jobPlace: { value: 'Отсутствует', status: DoubtStatus.WARN, message: 'Отсутствует место работы' },
    jobExperience: { value: '17 лет и 7 мес.', status: DoubtStatus.OK },
    jobPosition: { value: 'Генеральный директор', status: DoubtStatus.OK },
    monthOfficialIncome: { value: 25000, status: DoubtStatus.ERROR, message: 'Неизвестный источник' },
    incomeDocument: { value: '2-НДФЛ', status: DoubtStatus.WARN, message: 'Документ требует проверки' },
    monthAdditionalIncome: { value: 14500, status: DoubtStatus.OK },
    isAdditionalIncomeApproved: { value: false, status: DoubtStatus.WARN, message: 'Не подтвержденный доход' },
    additionalIncomeSource: { value: 'Самозанятый автомеханик', status: DoubtStatus.OK },
    haveBankSavings: { value: false, status: DoubtStatus.WARN, message: 'Не имеет сбережений' },
  },
  {
    id: '3',
    firstName: { value: 'Антон', status: DoubtStatus.OK },
    secondName: { value: 'Бобров', status: DoubtStatus.OK },
    middleName: { value: 'Сергеевич', status: DoubtStatus.OK },
    birthDate: { value: '07.06.1988', status: DoubtStatus.OK },
    passSeries: { value: '2145', status: DoubtStatus.OK },
    passNumber: { value: '235750', status: DoubtStatus.OK },
    registrationAddress: { value: 'г. Новосибирск', status: DoubtStatus.OK },
    residenceAddress: { value: 'г. Новосибирск', status: DoubtStatus.OK },
    maritalStatus: { value: MaritalStatus.SINGLE, status: DoubtStatus.OK },
    haveChildren: { value: false, status: DoubtStatus.OK },
    jobPlace: { value: 'ЗАО "Аристотель"', status: DoubtStatus.OK },
    jobExperience: { value: '12 лет и 3 мес.', status: DoubtStatus.OK },
    jobPosition: { value: 'Генеральный директор', status: DoubtStatus.OK },
    monthOfficialIncome: { value: 175615.27, status: DoubtStatus.OK },
    incomeDocument: { value: '2-НДФЛ', status: DoubtStatus.OK },
    monthAdditionalIncome: { value: 23350, status: DoubtStatus.OK },
    isAdditionalIncomeApproved: { value: false, status: DoubtStatus.WARN, message: 'Не подтвержденный доход' },
    additionalIncomeSource: { value: 'Доходы от оказания консалтинговых услуг', status: DoubtStatus.OK },
    haveBankSavings: { value: false, status: DoubtStatus.WARN, message: 'Не имеет сбережений' },
  },
];

export const profileServiceMock = {
  getProfile: (profileId: string) => new Promise<ProfileInfo>((resolve) => {
    setTimeout(() => {
      resolve(profileMockData.at(Number(profileId) - 1) as ProfileInfo);
    }, 500);
  }),

  getProfiles: () => new Promise<ProfileInfo[]>((resolve) => {
    setTimeout(() => {
      resolve(profileMockData);
    }, 1500);
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rejectProfile: (profileId: string) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 2300);
  }),
};

export const profileService = {
  getProfile: (profileId: string) =>
    fetchServer<ProfileInfo>(
        `http://localhost:5005/api/get_profile_info?id=${profileId}`,
    ),
};
