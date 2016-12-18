import questionTypes from '../constants/questionTypes';

export const correctAnswers = [
  ['paint', 'photo'],
  'photo',
  'Option 1',
  ['paint', 'photo'],
  'photo',
  'Option 1',
  ['paint', 'photo'],
  'photo',
  'Option 1',
  ['paint', 'photo']
];

export const questions = [
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
          title: 'Option 2',
          width: 304,
          height: 455
        },
        isSelected: true
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 3',
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
          title: 'Option 2',
          width: 304,
          height: 455
        },
        isSelected: true
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 3',
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
          title: 'Option 2',
          width: 304,
          height: 455
        },
        isSelected: true
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          title: 'Option 3',
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

export default {
  questions,
  correctAnswers
};
