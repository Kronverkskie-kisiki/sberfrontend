import { message } from 'antd';
import { GigachatResponse } from '../model/gigachat';

export const gigachatServiceMock = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getProfileSummary: (profileId: string): Promise<GigachatResponse> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ answer: 'О человеке:\n\nНаталья Стаурская — женщина, которая любит красоту во всем мире. ' +
            'Она живет в Омске, Россия, где она получила образование в Омском государственном университете им. Ф.М. Достоевского. ' +
            'В настоящее время она работает научным продюсером в области международных связей. ' +
            'У нее также есть опыт работы в качестве начальника отдела международных и научных проектов, а также в качестве старшего преподавателя. ' +
            'Наталья увлекается английским языком и имеет степень кандидата наук. Она также владеет русским и немецким языками.' });
      }, 1000);
    }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRiskInfoSummary: (riskInfoId: string): Promise<GigachatResponse> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ answer: 'Исходя из анализа, круг общения скорее является положительным, ' +
            'так как все участники имеют возможность доступа к закрытым группам и университетам.',
        });
      }, 1000);
    }),

};
export const gigachatService = {

};
