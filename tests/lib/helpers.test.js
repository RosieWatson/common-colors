const helpers = require('../../src/lib/helpers')

describe('helpers', () => {
  describe('getColorFrequency', () => {
    describe('when we have no colors', () => {
      it('returns an empty object', () => {
        expect(helpers.getColorFrequency([])).toEqual({})
      })
    })

    describe('when we have colors', () => {
      it('returns an object with the frequency they occour', () => {
        expect(helpers.getColorFrequency(['abc', 'cde', 'abc'])).toEqual({'abc': 2, 'cde': 1})
      })
    })
  })

  describe('getKeysByValue', () => {
    describe('when we have no matches', () => {
      it('returns an empty array', () => {
        expect(helpers.getKeysByValue({ hello: 1, goodbye: 4 }, 7)).toEqual([])
      })
    })
    describe('when we have one match', () => {
      it('returns an array with that element', () => {
        expect(helpers.getKeysByValue({ hello: 1, goodbye: 4 }, 4)).toEqual(['goodbye'])
      })
    })
    describe('when we have multiple matches', () => {
      it('returns an array with those elements', () => {
        expect(helpers.getKeysByValue({ hello: 1, goodbye: 4, andAgain: 4 }, 4)).toEqual(['goodbye', 'andAgain'])
      })
    }) 
  })

  describe('parseColors', () => {
    describe('when there are colors', () => {
      it('returns them in an array', () => {
        expect(helpers.parseColors('123 abc #FF89a;hello')).toEqual(['#FF89a;'])
      })
    })

    describe('when there are no colors', () => {
      it('returns null', () => {
        expect(helpers.parseColors('123 abc #FF89a hello')).toBeNull()
      })
    })
  })
})
