import questionTypes from '../constants/questionTypes';
import answerValues from '../constants/answerValues';

const data = {
  time: 'NN',
  lives: {
    left: 2,
    total: 3
  },
  questions: [
    {
      type: questionTypes.GUESS_EVERY_ITEM,
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
      type: questionTypes.GUESS_SINGLE_ITEM,
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
      type: questionTypes.GUESS_EVERY_ITEM,
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
      type: questionTypes.GUESS_SINGLE_ITEM,
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
      type: questionTypes.GUESS_EVERY_ITEM,
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
      type: questionTypes.GUESS_SINGLE_ITEM,
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
      type: questionTypes.GUESS_EVERY_ITEM,
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
  ],
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
  option: {
    id: 1,
    name: 'question1',
    image: {
      url: 'http://placehold.it/705x455',
      title: 'Option 1',
      width: 705,
      height: 455
    }
  }
};

export default data;
