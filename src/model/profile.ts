import { Doubtful, MaritalStatus } from './common';

export type ProfileInfo = {
  id: string;
  firstName: Doubtful<string>; // Имя
  secondName: Doubtful<string>; // Фамилия
  middleName: Doubtful<string>; // Отчество
  birthDate: Doubtful<string>; // Дата рождения
  passSeries: Doubtful<string>; // Серия паспорта
  passNumber: Doubtful<string>; // Номер паспорта
  registrationAddress: Doubtful<string>; // Адрес регистрации
  residenceAddress: Doubtful<string>; // Адрес проживания
  maritalStatus: Doubtful<MaritalStatus>; // Семейное положение
  haveChildren: Doubtful<boolean>; // Наличие детей
  jobPlace: Doubtful<string>; // Место работы
  jobExperience: Doubtful<string>; // Стаж работы
  jobPosition: Doubtful<string>; // Должность
  monthOfficialIncome: Doubtful<number>; // Ежемесячный подтвержденный доход по месту работы
  incomeDocument: Doubtful<string>; // Документ, подтверждающий доход
  monthAdditionalIncome: Doubtful<number>; // Ежемесячный дополнительный доход
  isAdditionalIncomeApproved: Doubtful<boolean>; // Дополнительный доход подтвержден документально
  additionalIncomeSource: Doubtful<string>; // Источник дополнительного дохода
  haveBankSavings: Doubtful<boolean>; // Наличие сбережений на счетах в Банке
}


