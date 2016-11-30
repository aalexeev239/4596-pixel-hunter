import answerValues from '../constants/answerValues';

const data = {
  pageTitle: 'Победа!',
  results: [
    {
      answers: [
        {value: answerValues.WRONG},
        {value: answerValues.SLOW},
        {value: answerValues.FAST},
        {value: answerValues.CORRECT},
        {value: answerValues.WRONG},
        {value: answerValues.UNKNOWN},
        {value: answerValues.SLOW},
        {value: answerValues.UNKNOWN},
        {value: answerValues.FAST},
        {value: answerValues.UNKNOWN}
      ],
      isSuccess: true,
      points: 100,
      total: 900,
      additionals: [
        {
          title: 'Бонус за скорость',
          extra: 1,
          icon: 'fast',
          points: 50,
          total: 50
        },
        {
          title: 'Бонус за жизни',
          extra: 2,
          icon: 'heart',
          points: 50,
          total: 100
        },
        {
          title: 'Штраф за медлительность',
          extra: 2,
          icon: 'slow',
          points: 50,
          total: -100
        }
      ],
      final: 950
    },
    {
      answers: [
        {value: answerValues.WRONG},
        {value: answerValues.SLOW},
        {value: answerValues.FAST},
        {value: answerValues.CORRECT},
        {value: answerValues.WRONG},
        {value: answerValues.UNKNOWN},
        {value: answerValues.SLOW},
        {value: answerValues.UNKNOWN},
        {value: answerValues.FAST},
        {value: answerValues.UNKNOWN}
      ],
      isSuccess: false,
      points: null,
      total: null,
      additionals: [],
      final: null,
    },
    {
      answers: [
        {value: answerValues.WRONG},
        {value: answerValues.SLOW},
        {value: answerValues.FAST},
        {value: answerValues.CORRECT},
        {value: answerValues.WRONG},
        {value: answerValues.UNKNOWN},
        {value: answerValues.SLOW},
        {value: answerValues.UNKNOWN},
        {value: answerValues.FAST},
        {value: answerValues.UNKNOWN}
      ],
      isSuccess: true,
      points: 100,
      total: 900,
      additionals: [
        {
          title: 'Бонус за жизни',
          extra: 2,
          icon: 'heart',
          points: 50,
          total: 100
        }
      ],
      final: 950
    }
  ]
};

export default data;
