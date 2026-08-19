import { BRANDS, CARRIERS, CATEGORIES, SUPPLIERS, UNITS, WAREHOUSES } from '../data/fixtures';
import { useWmsStore } from '../store';
import type { FormData, ModalType } from '../types';

const TITLE_MAP: Record<Exclude<ModalType, null>, string> = {
  product: 'Add Product',
  receipt: 'New Stock Receipt',
  dispatch: 'New Dispatch',
  transfer: 'New Warehouse Transfer',
  return: 'New Return',
  damage: 'Report Damaged Goods',
};

const SUBMIT_MAP: Record<Exclude<ModalType, null>, string> = {
  product: 'Add Product',
  receipt: 'Create Receipt',
  dispatch: 'Create Dispatch',
  transfer: 'Submit Transfer',
  return: 'Log Return',
  damage: 'File Report',
};

export function Modal() {
  const activeModal = useWmsStore((s) => s.activeModal);
  const formData = useWmsStore((s) => s.formData);
  const setForm = useWmsStore((s) => s.setForm);
  const closeModal = useWmsStore((s) => s.closeModal);
  const submitModal = useWmsStore((s) => s.submitModal);

  if (!activeModal) return null;

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => setForm(key, value);

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <div className="dialog-title">{TITLE_MAP[activeModal]}</div>
        <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeModal === 'product' && (
            <>
              <div className="field">
                <label>Product Name</label>
                <input className="input" value={formData.name} onChange={(e) => set('name', e.target.value)} />
              </div>
              <div className="field">
                <label>SKU</label>
                <input className="input" value={formData.sku} onChange={(e) => set('sku', e.target.value)} />
              </div>
              <div className="field">
                <label>Category</label>
                <select className="input" value={formData.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Brand</label>
                <select className="input" value={formData.brand} onChange={(e) => set('brand', e.target.value)}>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Unit</label>
                <select className="input" value={formData.unit} onChange={(e) => set('unit', e.target.value)}>
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Minimum Stock Level</label>
                <input
                  className="input"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => set('minStock', e.target.value)}
                />
              </div>
            </>
          )}

          {activeModal === 'receipt' && (
            <>
              <div className="field">
                <label>Supplier</label>
                <select className="input" value={formData.supplier} onChange={(e) => set('supplier', e.target.value)}>
                  {SUPPLIERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Warehouse</label>
                <select className="input" value={formData.warehouseId} onChange={(e) => set('warehouseId', e.target.value)}>
                  {WAREHOUSES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Units Expected</label>
                <input className="input" type="number" value={formData.items} onChange={(e) => set('items', e.target.value)} />
              </div>
              <div className="field">
                <label>Expected Date</label>
                <input
                  className="input"
                  type="date"
                  value={formData.expectedDate}
                  onChange={(e) => set('expectedDate', e.target.value)}
                />
              </div>
            </>
          )}

          {activeModal === 'dispatch' && (
            <>
              <div className="field">
                <label>Customer</label>
                <input className="input" value={formData.customer} onChange={(e) => set('customer', e.target.value)} />
              </div>
              <div className="field">
                <label>Warehouse</label>
                <select className="input" value={formData.warehouseId} onChange={(e) => set('warehouseId', e.target.value)}>
                  {WAREHOUSES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Carrier</label>
                <select className="input" value={formData.carrier} onChange={(e) => set('carrier', e.target.value)}>
                  {CARRIERS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Units</label>
                <input className="input" type="number" value={formData.items} onChange={(e) => set('items', e.target.value)} />
              </div>
            </>
          )}

          {activeModal === 'transfer' && (
            <>
              <div className="field">
                <label>From Warehouse</label>
                <select
                  className="input"
                  value={formData.fromWarehouseId}
                  onChange={(e) => set('fromWarehouseId', e.target.value)}
                >
                  {WAREHOUSES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>To Warehouse</label>
                <select className="input" value={formData.toWarehouseId} onChange={(e) => set('toWarehouseId', e.target.value)}>
                  {WAREHOUSES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Units</label>
                <input className="input" type="number" value={formData.items} onChange={(e) => set('items', e.target.value)} />
              </div>
              <div className="field">
                <label>Notes</label>
                <textarea className="input" value={formData.notes} onChange={(e) => set('notes', e.target.value)} />
              </div>
            </>
          )}

          {activeModal === 'return' && (
            <>
              <div className="field">
                <label>Return Type</label>
                <div className="seg">
                  <label className="seg-opt">
                    <input
                      type="radio"
                      checked={formData.returnTypeIsCustomer}
                      onChange={() => {
                        set('returnTypeIsCustomer', true);
                        set('returnTypeIsSupplier', false);
                      }}
                    />
                    Customer
                  </label>
                  <label className="seg-opt">
                    <input
                      type="radio"
                      checked={formData.returnTypeIsSupplier}
                      onChange={() => {
                        set('returnTypeIsCustomer', false);
                        set('returnTypeIsSupplier', true);
                      }}
                    />
                    Supplier
                  </label>
                </div>
              </div>
              <div className="field">
                <label>Item</label>
                <input className="input" value={formData.item} onChange={(e) => set('item', e.target.value)} />
              </div>
              <div className="field">
                <label>Quantity</label>
                <input className="input" type="number" value={formData.qty} onChange={(e) => set('qty', e.target.value)} />
              </div>
              <div className="field">
                <label>Reason</label>
                <input className="input" value={formData.reason} onChange={(e) => set('reason', e.target.value)} />
              </div>
            </>
          )}

          {activeModal === 'damage' && (
            <>
              <div className="field">
                <label>Item</label>
                <input className="input" value={formData.item} onChange={(e) => set('item', e.target.value)} />
              </div>
              <div className="field">
                <label>Quantity</label>
                <input className="input" type="number" value={formData.qty} onChange={(e) => set('qty', e.target.value)} />
              </div>
              <div className="field">
                <label>Warehouse</label>
                <select className="input" value={formData.warehouseId} onChange={(e) => set('warehouseId', e.target.value)}>
                  {WAREHOUSES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Reason</label>
                <select className="input" value={formData.reason} onChange={(e) => set('reason', e.target.value)}>
                  <option>Water damage</option>
                  <option>Crushed in transit</option>
                  <option>Expired</option>
                  <option>Manufacturing defect</option>
                </select>
              </div>
            </>
          )}
        </div>
        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submitModal}>
            {SUBMIT_MAP[activeModal]}
          </button>
        </div>
      </div>
    </div>
  );
}
