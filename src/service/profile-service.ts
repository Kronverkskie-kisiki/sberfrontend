import { ProfileInfo } from '../model/profile';
import { DoubtStatus, MaritalStatus } from '../model/common';
import { fetchServer } from './fetch-server';

const profileMockData: readonly ProfileInfo[]= [
  {
    id: '1',
    firstName: { value: 'Сэргей', status: DoubtStatus.WARN, message: 'Возможная орфографическая ошибка' },
    secondName: { value: 'Иванов', status: DoubtStatus.OK },
    middleName: { value: 'Амогусович', status: DoubtStatus.OK },
    birthDate: { value: '24.08.1993', status: DoubtStatus.OK },
    passSeries: { value: '3204', status: DoubtStatus.OK },
    passNumber: { value: '123456', status: DoubtStatus.OK },
    registrationAddress: { value: 'г. Москва', status: DoubtStatus.OK },
    residenceAddress: { value: 'г. Москва', status: DoubtStatus.OK },
    maritalStatus: { value: MaritalStatus.MARRIED, status: DoubtStatus.WARN, message: 'Отсутствует подтверждение из МВД' },
    haveChildren: { value: true, status: DoubtStatus.OK },
    jobPlace: { value: 'ООО "Мегахорош"', status: DoubtStatus.OK },
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getProfile: (profileId: string) => new Promise<ProfileInfo>((resolve) => {
    setTimeout(() => {
      resolve(profileMockData[0]);
    }, 500);
  }),
};

export const profileService = {
  getProfile: (profileId: string) =>
    fetchServer<ProfileInfo>(
        `http://localhost:5005/api/get_profile_info?id=${profileId}`,
    ),
};
