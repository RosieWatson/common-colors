const mostCommonColor = require('../src/mostCommonColor')

describe('mostCommonColor', () => {
  beforeEach(() => {
    const helpers = jest.mock('../src/lib/helpers')
    helpers.getFiles = () => { console.log('hello') }
  })

  describe('start', () => {
    it('returns the most frequent colour', () => {
      expect(mostCommonColor.start('123 abc #FF89a;hello')).toEqual(['#FF89a;'])
    })
  })
})
