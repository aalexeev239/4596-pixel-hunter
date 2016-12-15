import questionTypes from '../constants/questionTypes';
import answerValues from '../constants/answerValues';
import config from '../config';


export const livesState = 2;

const getInitialState = () => {
  return {
    lives: config.lives.TOTAL,
    answers: []
  }
};

const questions = [
  {
    type: questionTypes.GUESS_EVERY_OPTION,
    options: [
      {
        name: 'question1',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 1',
          width: 468,
          height: 458
        }
      },
      {
        name: 'question2',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 2',
          width: 468,
          height: 458
        }
      }
    ]
  },
  {
    type: questionTypes.GUESS_SINGLE_OPTION,
    option: {
      name: 'question1',
      image: {
        url: 'http://placehold.it/705x455',
        title: 'Option 1',
        width: 705,
        height: 455
      }
    }
  },
  {
    type: questionTypes.FIND_PAINT,
    options: [
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: false
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: true
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: false
      }
    ]
  },
  {
    type: questionTypes.GUESS_EVERY_OPTION,
    options: [
      {
        name: 'question1',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 1',
          width: 468,
          height: 458
        }
      },
      {
        name: 'question2',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 2',
          width: 468,
          height: 458
        }
      }
    ]
  },
  {
    type: questionTypes.GUESS_SINGLE_OPTION,
    option: {
      name: 'question1',
      image: {
        url: 'http://placehold.it/705x455',
        title: 'Option 1',
        width: 705,
        height: 455
      }
    }
  },
  {
    type: questionTypes.FIND_PAINT,
    options: [
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: false
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: true
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: false
      }
    ]
  },
  {
    type: questionTypes.GUESS_EVERY_OPTION,
    options: [
      {
        name: 'question1',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 1',
          width: 468,
          height: 458
        }
      },
      {
        name: 'question2',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 2',
          width: 468,
          height: 458
        }
      }
    ]
  },
  {
    type: questionTypes.GUESS_SINGLE_OPTION,
    option: {
      name: 'question1',
      image: {
        url: 'http://placehold.it/705x455',
        title: 'Option 1',
        width: 705,
        height: 455
      }
    }
  },
  {
    type: questionTypes.FIND_PAINT,
    options: [
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: false
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: true
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 1',
          width: 304,
          height: 455
        },
        isSelected: false
      }
    ]
  },
  {
    type: questionTypes.GUESS_EVERY_OPTION,
    options: [
      {
        name: 'question1',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 1',
          width: 468,
          height: 458
        }
      },
      {
        name: 'question2',
        image: {
          url: 'http://placehold.it/468x458',
          title: 'Option 2',
          width: 468,
          height: 458
        }
      }
    ]
  }
];


const data = {
  time: 'NN',
  questions,
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
  ]
};

export default data;
