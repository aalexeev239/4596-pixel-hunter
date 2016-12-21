import {answerTypes} from '../constants/answerTypes';

const data = {
  pageTitle: 'Победа!',
  results: [
    {
      answers: [
        {value: answerTypes.WRONG},
        {value: answerTypes.SLOW},
        {value: answerTypes.FAST},
        {value: answerTypes.CORRECT},
        {value: answerTypes.WRONG},
        {value: answerTypes.UNKNOWN},
        {value: answerTypes.SLOW},
        {value: answerTypes.UNKNOWN},
        {value: answerTypes.FAST},
        {value: answerTypes.UNKNOWN}
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
        {value: answerTypes.WRONG},
        {value: answerTypes.SLOW},
        {value: answerTypes.FAST},
        {value: answerTypes.CORRECT},
        {value: answerTypes.WRONG},
        {value: answerTypes.UNKNOWN},
        {value: answerTypes.SLOW},
        {value: answerTypes.UNKNOWN},
        {value: answerTypes.FAST},
        {value: answerTypes.UNKNOWN}
      ],
      isSuccess: false,
      points: null,
      total: null,
      additionals: [],
      final: null
    },
    {
      answers: [
        {value: answerTypes.WRONG},
        {value: answerTypes.SLOW},
        {value: answerTypes.FAST},
        {value: answerTypes.CORRECT},
        {value: answerTypes.WRONG},
        {value: answerTypes.UNKNOWN},
        {value: answerTypes.SLOW},
        {value: answerTypes.UNKNOWN},
        {value: answerTypes.FAST},
        {value: answerTypes.UNKNOWN}
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
