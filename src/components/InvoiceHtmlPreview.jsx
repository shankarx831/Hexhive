import React from 'react';
import { numberToWords } from '../utils/invoiceUtils';

const InvoiceHtmlPreview = ({ data, totals, options }) => {
  const halfRate = totals.gstRate / 2;
  const showBank = options?.showBankDetails !== false;
  const showGst = options?.showBuyerGst !== false;

  const totalQty = data.items.reduce((acc, item) => acc + Number(item.qty || 0), 0);
  const primaryHsn = data.items.length > 0 ? (data.items[0].hsn || '') : '';

  return (
    <div className="bg-gray-800 p-4 md:p-8 overflow-y-auto h-full flex justify-center items-start select-text">
      <div className="bg-white text-black font-sans text-[11px] leading-tight border-2 border-black w-full max-w-[750px] shadow-2xl p-6 min-h-[1050px] flex flex-col justify-between">
        <div>
          <h1 className="text-base font-bold text-center mb-2 uppercase tracking-wider">Tax Invoice</h1>
          
          <div className="border border-black flex flex-col">
            {/* Row 1: Seller Info & Invoice Meta */}
            <div className="flex border-b border-black">
              <div className="w-1/2 border-r border-black p-2 flex flex-col gap-0.5">
                <span className="font-bold text-xs">HEXHIVE SOLUTIONS</span>
                <span>First Floor, No. 58, Canteen Street, Heritage Town,</span>
                <span>Puducherry, Puducherry, 605001</span>
                <span>GSTIN/UIN : <strong className="font-bold">34HYFPK1653H1ZE</strong></span>
                <span>State Name : Puducherry, Code : <strong className="font-bold">34</strong></span>
                <span>Contact : +91 9751 397500</span>
                <span>E-Mail : contact@hexhivesolutions.com</span>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="flex border-b border-black flex-1">
                  <div className="w-1/2 border-r border-black p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Invoice No.</span>
                    <strong className="font-bold">{data.invNo}</strong>
                  </div>
                  <div className="w-1/2 p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Dated</span>
                    <strong className="font-bold">{data.date ? data.date.split('-').reverse().join('-') : ''}</strong>
                  </div>
                </div>
                <div className="flex border-b border-black flex-1">
                  <div className="w-1/2 border-r border-black p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Delivery Note</span>
                  </div>
                  <div className="w-1/2 p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Mode/Terms of Payment</span>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="w-1/2 border-r border-black p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Reference No. & Date.</span>
                  </div>
                  <div className="w-1/2 p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Other References</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Row 2: Buyer Info & Delivery Meta */}
            <div className="flex border-b border-black">
              <div className="w-1/2 border-r border-black p-2 flex flex-col gap-0.5">
                <span className="text-[9px] text-gray-600">Buyer (Bill to)</span>
                <strong className="font-bold text-xs">{data.customerName || 'Client Name'}</strong>
                <span className="whitespace-pre-line">{data.customerAddr || 'Client Address'}</span>
                {data.customerPhone && <span>Contact : {data.customerPhone}</span>}
                {showGst && data.buyerGst && <span>GSTIN/UIN : <strong className="font-bold">{data.buyerGst}</strong></span>}
                {showGst && data.buyerGst && <span>State Name : Puducherry, Code : <strong className="font-bold">34</strong></span>}
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="flex border-b border-black flex-1">
                  <div className="w-1/2 border-r border-black p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Buyer's Order No.</span>
                  </div>
                  <div className="w-1/2 p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Dated</span>
                  </div>
                </div>
                <div className="flex border-b border-black flex-1">
                  <div className="w-1/2 border-r border-black p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Dispatch Doc No.</span>
                  </div>
                  <div className="w-1/2 p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Delivery Note Date</span>
                  </div>
                </div>
                <div className="flex border-b border-black flex-1">
                  <div className="w-1/2 border-r border-black p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Dispatched through</span>
                  </div>
                  <div className="w-1/2 p-1.5 flex flex-col">
                    <span className="text-[9px] text-gray-600">Destination</span>
                  </div>
                </div>
                <div className="flex flex-1 p-1.5">
                  <span className="text-[9px] text-gray-600">Terms of Delivery</span>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="flex border-b border-black font-bold text-center bg-gray-50/50">
              <div className="w-[5%] border-r border-black p-1.5">SI No.</div>
              <div className="w-[45%] border-r border-black p-1.5 text-left">Description of Goods</div>
              <div className="w-[10%] border-r border-black p-1.5">HSN/SAC</div>
              <div className="w-[10%] border-r border-black p-1.5">Quantity</div>
              <div className="w-[10%] border-r border-black p-1.5 text-right">Rate</div>
              <div className="w-[5%] border-r border-black p-1.5">per</div>
              <div className="w-[15%] p-1.5 text-right">Amount</div>
            </div>

            {/* Table Items */}
            <div className="flex flex-col flex-1 min-h-[220px]">
              {data.items.map((item, idx) => {
                 const rawTotal = Number(item.total || 0);
                 const itemAmount = (totals.mode === 'inclusive' && totals.gstRate > 0)
                   ? (rawTotal / (1 + totals.gstRate / 100))
                   : rawTotal;
                 const qty = Number(item.qty || 1);
                 const rate = qty > 0 ? (itemAmount / qty) : itemAmount;
                 return (
                  <div key={idx} className="flex">
                    <div className="w-[5%] border-r border-black p-1.5 text-center">{idx + 1}</div>
                    <div className="w-[45%] border-r border-black p-1.5 font-bold">{item.desc}</div>
                    <div className="w-[10%] border-r border-black p-1.5 text-center">{item.hsn}</div>
                    <div className="w-[10%] border-r border-black p-1.5 text-center font-bold">{item.qty} NOS</div>
                    <div className="w-[10%] border-r border-black p-1.5 text-right">{rate.toFixed(2)}</div>
                    <div className="w-[5%] border-r border-black p-1.5 text-center">NOS</div>
                    <div className="w-[15%] p-1.5 text-right font-bold">{itemAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                 );
              })}
              
              {/* GST lines inside table maintaining 7 columns */}
              {totals.igst > 0 ? (
                <div className="flex">
                  <div className="w-[5%] border-r border-black p-1.5"></div>
                  <div className="w-[45%] border-r border-black p-1.5 font-bold text-right italic">IGST OUTPUT</div>
                  <div className="w-[10%] border-r border-black p-1.5"></div>
                  <div className="w-[10%] border-r border-black p-1.5"></div>
                  <div className="w-[10%] border-r border-black p-1.5"></div>
                  <div className="w-[5%] border-r border-black p-1.5"></div>
                  <div className="w-[15%] p-1.5 text-right font-bold">{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              ) : (totals.cgst > 0 && (
                <>
                  <div className="flex">
                    <div className="w-[5%] border-r border-black p-1.5"></div>
                    <div className="w-[45%] border-r border-black p-1.5 font-bold text-right italic">CGST OUTPUT</div>
                    <div className="w-[10%] border-r border-black p-1.5"></div>
                    <div className="w-[10%] border-r border-black p-1.5"></div>
                    <div className="w-[10%] border-r border-black p-1.5"></div>
                    <div className="w-[5%] border-r border-black p-1.5"></div>
                    <div className="w-[15%] p-1.5 text-right font-bold">{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="flex">
                    <div className="w-[5%] border-r border-black p-1.5"></div>
                    <div className="w-[45%] border-r border-black p-1.5 font-bold text-right italic">SGST OUTPUT</div>
                    <div className="w-[10%] border-r border-black p-1.5"></div>
                    <div className="w-[10%] border-r border-black p-1.5"></div>
                    <div className="w-[10%] border-r border-black p-1.5"></div>
                    <div className="w-[5%] border-r border-black p-1.5"></div>
                    <div className="w-[15%] p-1.5 text-right font-bold">{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </>
              ))}

              {/* Spacer to push borders down */}
              <div className="flex flex-1">
                <div className="w-[5%] border-r border-black"></div>
                <div className="w-[45%] border-r border-black"></div>
                <div className="w-[10%] border-r border-black"></div>
                <div className="w-[10%] border-r border-black"></div>
                <div className="w-[10%] border-r border-black"></div>
                <div className="w-[5%] border-r border-black"></div>
                <div className="w-[15%]"></div>
              </div>
            </div>

            {/* Table Totals Row */}
            <div className="flex border-t border-black bg-gray-50/50">
              <div className="w-[5%] border-r border-black p-1.5"></div>
              <div className="w-[45%] border-r border-black p-1.5 font-bold text-right">Total</div>
              <div className="w-[10%] border-r border-black p-1.5"></div>
              <div className="w-[10%] border-r border-black p-1.5 text-center font-bold">{totalQty} NOS</div>
              <div className="w-[10%] border-r border-black p-1.5"></div>
              <div className="w-[5%] border-r border-black p-1.5"></div>
              <div className="w-[15%] p-1.5 text-right font-bold">₹{totals.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            {/* Amount in words */}
            <div className="border-t border-black p-1.5 flex flex-col">
              <span className="text-[9px] text-gray-600">Amount Chargeable (in words)</span>
              <strong className="font-bold mt-0.5">RUPEES {numberToWords(totals.grandTotal).toUpperCase()} ONLY</strong>
            </div>

            {/* Tax Table */}
            {totals.igst > 0 ? (
              <>
                <div className="flex border-t border-black text-center font-bold bg-gray-50/50">
                  <div className="w-[25%] border-r border-black p-1">HSN/SAC</div>
                  <div className="w-[15%] border-r border-black p-1 text-right">Taxable Value</div>
                  <div className="w-[40%] border-r border-black flex flex-col">
                    <div className="border-b border-black p-0.5">Integrated Tax</div>
                    <div className="flex flex-1">
                      <div className="w-[40%] border-r border-black p-0.5">Rate</div>
                      <div className="w-[60%] p-0.5">Amount</div>
                    </div>
                  </div>
                  <div className="w-[20%] p-1 text-right flex items-center justify-end">Total Tax Amount</div>
                </div>
                <div className="flex border-t border-black">
                  <div className="w-[25%] border-r border-black p-1">{primaryHsn}</div>
                  <div className="w-[15%] border-r border-black p-1 text-right">{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="w-[40%] border-r border-black flex">
                    <div className="w-[40%] border-r border-black p-1 text-center">{totals.gstRate}%</div>
                    <div className="w-[60%] p-1 text-right">{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[20%] p-1 text-right">{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="flex border-t border-black font-bold bg-gray-50/50">
                  <div className="w-[25%] border-r border-black p-1 text-right">Total</div>
                  <div className="w-[15%] border-r border-black p-1 text-right">{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="w-[40%] border-r border-black flex">
                    <div className="w-[40%] border-r border-black p-1"></div>
                    <div className="w-[60%] p-1 text-right">{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[20%] p-1 text-right">{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex border-t border-black text-center font-bold bg-gray-50/50">
                  <div className="w-[25%] border-r border-black p-1">HSN/SAC</div>
                  <div className="w-[15%] border-r border-black p-1 text-right">Taxable Value</div>
                  <div className="w-[20%] border-r border-black flex flex-col">
                    <div className="border-b border-black p-0.5">Central Tax</div>
                    <div className="flex flex-1">
                      <div className="w-[40%] border-r border-black p-0.5">Rate</div>
                      <div className="w-[60%] p-0.5">Amount</div>
                    </div>
                  </div>
                  <div className="w-[20%] border-r border-black flex flex-col">
                    <div className="border-b border-black p-0.5">State Tax</div>
                    <div className="flex flex-1">
                      <div className="w-[40%] border-r border-black p-0.5">Rate</div>
                      <div className="w-[60%] p-0.5">Amount</div>
                    </div>
                  </div>
                  <div className="w-[20%] p-1 text-right flex items-center justify-end">Total Tax Amount</div>
                </div>
                <div className="flex border-t border-black">
                  <div className="w-[25%] border-r border-black p-1">{primaryHsn}</div>
                  <div className="w-[15%] border-r border-black p-1 text-right">{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="w-[20%] border-r border-black flex">
                    <div className="w-[40%] border-r border-black p-1 text-center">{halfRate}%</div>
                    <div className="w-[60%] p-1 text-right">{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[20%] border-r border-black flex">
                    <div className="w-[40%] border-r border-black p-1 text-center">{halfRate}%</div>
                    <div className="w-[60%] p-1 text-right">{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[20%] p-1 text-right">{(totals.cgst + totals.sgst).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="flex border-t border-black font-bold bg-gray-50/50">
                  <div className="w-[25%] border-r border-black p-1 text-right">Total</div>
                  <div className="w-[15%] border-r border-black p-1 text-right">{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="w-[20%] border-r border-black flex">
                    <div className="w-[40%] border-r border-black p-1"></div>
                    <div className="w-[60%] p-1 text-right">{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[20%] border-r border-black flex">
                    <div className="w-[40%] border-r border-black p-1"></div>
                    <div className="w-[60%] p-1 text-right">{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[20%] p-1 text-right">{(totals.cgst + totals.sgst).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </>
            )}

            {/* Tax Amount in words */}
            <div className="border-t border-black p-1.5">
              <span className="text-[9px] text-gray-600">Tax Amount (in words) : </span>
              <strong className="font-bold">RUPEES {numberToWords(Math.round(totals.totalTax || (totals.cgst + totals.sgst + (totals.igst || 0)))).toUpperCase()} ONLY</strong>
            </div>

            {/* Footer Info */}
            <div className="flex border-t border-black">
              <div className="w-1/2 border-r border-black p-2 flex flex-col">
                <div>
                  <div className="mb-2">Company's PAN : <strong className="font-bold">HYFPK1653H</strong></div>
                  <div className="underline font-bold text-[9px]">Declaration</div>
                  <p className="text-[9px] text-gray-700 leading-normal">
                    We declare that this invoice shows the actual price of the
                    goods described and that all particulars are true and correct.
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                {showBank ? (
                  <div className="border-b border-black p-2 bg-gray-50/30">
                    <div className="font-bold underline text-[10px] mb-1">Company's Bank Details</div>
                    <div className="grid grid-cols-[85px_1fr] gap-x-1 text-[10px]">
                      <span className="text-gray-600">Bank Name</span><strong className="font-bold">: Axis Bank</strong>
                      <span className="text-gray-600">A/c No.</span><strong className="font-bold">: 926020005853817</strong>
                      <span className="text-gray-600">Branch</span><strong className="font-bold">: PONDICHERRY MAIN BRANCH</strong>
                      <span className="text-gray-600">IFS Code</span><strong className="font-bold">: UTIB0000209</strong>
                      <span className="text-gray-600">SWIFT Code</span><strong className="font-bold">: AXISINBBA19</strong>
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-black p-2"></div>
                )}
                <div className="p-2 flex flex-col items-end text-right mt-4">
                  <div className="font-bold mb-6">for HEXHIVE SOLUTIONS</div>
                  <div className="text-[10px] text-gray-600 border-t border-gray-400 pt-1 w-40 text-center">Authorised Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-gray-500 text-center mt-4 pt-2 border-t border-gray-200">
          This is a computer generated invoice. No physical signature required.
        </div>
      </div>
    </div>
  );
};

export default InvoiceHtmlPreview;
