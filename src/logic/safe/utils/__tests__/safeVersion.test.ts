import { FEATURES } from 'src/config/networks/network.d'
import { checkIfSafeNeedsUpdate, hasFeature } from 'src/logic/safe/utils/safeVersion'

describe('Check safe version', () => {
  it('Calls checkIfSafeNeedUpdate, should return true if the safe version is bellow the target one', async () => {
    const safeVersion = '1.0.0'
    const targetVersion = '1.1.1'
    const { needUpdate } = await checkIfSafeNeedsUpdate(safeVersion, targetVersion)
    expect(needUpdate).toEqual(true)
  })
  it('Calls checkIfSafeNeedUpdate, should return false if the safe version is over the target one', async () => {
    const safeVersion = '1.3.0'
    const targetVersion = '1.1.1'
    const { needUpdate } = await checkIfSafeNeedsUpdate(safeVersion, targetVersion)
    expect(needUpdate).toEqual(false)
  })
  it('Calls checkIfSafeNeedUpdate, should return false if the safe version is equal the target one', async () => {
    const safeVersion = '1.1.1'
    const targetVersion = '1.1.1'
    const { needUpdate } = await checkIfSafeNeedsUpdate(safeVersion, targetVersion)
    expect(needUpdate).toEqual(false)
  })

  describe('hasFeature', () => {
    it('returns false for old Safes and SAFE_TX_GAS_OPTIONAL', () => {
      expect(hasFeature('1.1.1', FEATURES.SAFE_TX_GAS_OPTIONAL)).toBe(false)
    })

    it('returns true for new Safes and SAFE_TX_GAS_OPTIONAL', () => {
      expect(hasFeature('1.3.0', FEATURES.SAFE_TX_GAS_OPTIONAL)).toBe(true)
    })

    it('returns true for any Safes and SAFE_APPS', () => {
      expect(hasFeature('1.3.0', FEATURES.SAFE_APPS)).toBe(true)
      expect(hasFeature('1.1.1', FEATURES.SAFE_APPS)).toBe(true)
    })
  })
})
