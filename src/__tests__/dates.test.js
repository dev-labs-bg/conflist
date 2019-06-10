import { getFormattedDate } from '../core/Dates';

xdescribe('Formatted Date', () => {
  it('Start and end date are the same', () => {
    expect(getFormattedDate('Wed Jun 05 2019', 'Wed Jun 05 2019')).toEqual('5th Jun, 2019')
  })

  it('Start and end date are the same month, but different dates', () => {
    expect(getFormattedDate('Wed Jun 01 2019', 'Wed Jun 05 2019')).toEqual('1st-5th Jun, 2019')
  })

  it('Start and end date are different months', () => {
    expect(getFormattedDate('Wed May 01 2019', 'Wed Jun 05 2019')).toEqual('1st May-5th Jun, 2019')
  })
})
