import React, { useState, useEffect, useMemo } from 'react';
import { PDFViewer, usePDF } from '@react-pdf/renderer';
import InvoiceDocument from '../components/InvoiceDocument';
import InvoiceHtmlPreview from '../components/InvoiceHtmlPreview';
import { FileText, Download, Plus, Trash2, Settings, Eye, EyeOff } from 'lucide-react';

const InvoiceGenerator = () => {
  const [gstMode, setGstMode] = useState('inclusive');
  const [gstRate, setGstRate] = useState(18);
  const [taxType, setTaxType] = useState('cgst_sgst');
  const [previewMode, setPreviewMode] = useState('html'); // 'html' or 'pdf'

  const [displayOptions, setDisplayOptions] = useState({
    showBankDetails: true,
    showBuyerGst: true,
  });

  const [data, setData] = useState({
    invNo: '208',
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    customerAddr: '',
    customerPhone: '',
    buyerGst: '',
    items: [
      { id: 1, desc: 'Web Development Services', hsn: '998314', qty: 1, total: 1000 }
    ]
  });

  // --- DEBOUNCED STATE FOR PDF RENDERING ---
  const [debouncedState, setDebouncedState] = useState({
    data,
    gstMode,
    gstRate,
    taxType,
    displayOptions
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState({ data, gstMode, gstRate, taxType, displayOptions });
    }, 800); // 800ms delay to stop flickering while typing
    return () => clearTimeout(timer);
  }, [data, gstMode, gstRate, taxType, displayOptions]);

  // --- HANDLERS ---
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData({ ...data, items: newItems });
  };

  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), desc: '', hsn: '', qty: '', total: 0 }] });

  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems });
  };

  const toggleOption = (key) => {
    setDisplayOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotals = (items, mode, rate, type = 'cgst_sgst') => {
    const rawTotal = items.reduce((acc, item) => acc + Number(item.total), 0);
    let subTotal, taxAmount, grandTotal;

    if (mode === 'inclusive') {
      grandTotal = Math.round(rawTotal);
      const basePrice = grandTotal / (1 + (rate / 100));
      subTotal = basePrice;
      taxAmount = grandTotal - basePrice;
    } else {
      subTotal = rawTotal;
      taxAmount = subTotal * (rate / 100);
      grandTotal = Math.round(subTotal + taxAmount);
    }
    
    subTotal = Number(subTotal.toFixed(2));
    taxAmount = Number(taxAmount.toFixed(2));
    const cgst = type === 'igst' ? 0 : Number((taxAmount / 2).toFixed(2));
    const sgst = type === 'igst' ? 0 : Number((taxAmount / 2).toFixed(2));
    const igst = type === 'igst' ? Number(taxAmount.toFixed(2)) : 0;

    return { subTotal, cgst, sgst, igst, totalTax: taxAmount, grandTotal, gstRate: rate, taxType: type };
  };

  // Calculate totals for Live Preview (Debounced)
  const previewTotals = useMemo(() =>
    calculateTotals(debouncedState.data.items, debouncedState.gstMode, debouncedState.gstRate, debouncedState.taxType),
    [debouncedState]
  );

  // Calculate totals for Download Button (Instant)
  const downloadTotals = calculateTotals(data.items, gstMode, gstRate, taxType);

  const inputClass = "w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm transition-all focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white";

  return (
    // Adjusted height to account for Navbar (h-20 = 5rem)
    <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] font-sans bg-cream dark:bg-gray-900 overflow-hidden transition-colors duration-300">

      {/* LEFT: FORM */}
      <div className="w-full md:w-[40%] bg-white/90 dark:bg-gray-800/80 backdrop-blur-md border-r border-white/20 dark:border-gray-700 shadow-xl z-10 flex flex-col h-full transition-colors duration-300">
        <div className="p-4 border-b border-white/20 dark:border-gray-700 bg-primary/95 dark:bg-gray-900/95 flex justify-between items-center text-white transition-colors duration-300 backdrop-blur-md">
          <h2 className="text-xl font-heading font-bold flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Invoice Generator
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">

          {/* Display Settings */}
          <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200/50 dark:border-gray-600/50 mb-6 shadow-sm transition-colors duration-300 backdrop-blur-sm">
            <h3 className="text-xs font-bold text-primary dark:text-accent-light mb-3 uppercase tracking-wide flex items-center transition-colors">
              <Settings className="w-3 h-3 mr-1" /> Display Settings
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => toggleOption('showBankDetails')}
                type="button"
                className={`flex items-center px-3 py-2 rounded text-xs font-medium border transition-colors ${displayOptions.showBankDetails ? 'bg-primary text-white border-primary dark:bg-accent' : 'bg-gray-50/50 dark:bg-gray-600/50 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-500'}`}
              >
                {displayOptions.showBankDetails ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                Bank Details
              </button>
              <button
                onClick={() => toggleOption('showBuyerGst')}
                type="button"
                className={`flex items-center px-3 py-2 rounded text-xs font-medium border transition-colors ${displayOptions.showBuyerGst ? 'bg-primary text-white border-primary dark:bg-accent' : 'bg-gray-50/50 dark:bg-gray-600/50 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-500'}`}
              >
                {displayOptions.showBuyerGst ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                Buyer GST
              </button>
            </div>
          </div>

          {/* Tax Settings */}
          <div className="bg-cream/50 dark:bg-gray-700/50 p-4 rounded-lg border border-accent/20 dark:border-gray-600/50 mb-6 transition-colors duration-300 backdrop-blur-sm">
            <h3 className="text-xs font-bold text-primary dark:text-accent-light mb-3 uppercase tracking-wide transition-colors">Tax Settings</h3>
            <div className="flex flex-wrap gap-4 mb-3">
              <label className="flex items-center cursor-pointer">
                <input type="radio" checked={gstMode === 'inclusive'} onChange={() => setGstMode('inclusive')} className="mr-2 accent-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Inclusive GST</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" checked={gstMode === 'exclusive'} onChange={() => setGstMode('exclusive')} className="mr-2 accent-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Exclusive GST</span>
              </label>
            </div>
            <div className="flex flex-wrap gap-4 mb-3 border-t border-gray-200 dark:border-gray-600 pt-3">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 self-center">Tax Type:</span>
              <label className="flex items-center cursor-pointer">
                <input type="radio" checked={taxType === 'cgst_sgst'} onChange={() => setTaxType('cgst_sgst')} className="mr-2 accent-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">CGST + SGST (9% + 9%)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" checked={taxType === 'igst'} onChange={() => setTaxType('igst')} className="mr-2 accent-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">IGST (18% Inter-state)</span>
              </label>
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-600 pt-3">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">GST Slab:</span>
              {[0, 5, 12, 18].map(rate => (
                <button key={rate} onClick={() => setGstRate(rate)}
                  className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${gstRate === rate ? 'bg-primary text-white border-primary dark:bg-accent' : 'bg-white/80 dark:bg-gray-600/80 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500'}`}>
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Inv. No</label>
              <input name="invNo" value={data.invNo} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Date</label>
              <input type="date" name="date" value={data.date} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <input name="customerName" value={data.customerName} onChange={handleChange} placeholder="Customer Name" className={inputClass} />
            <input name="customerAddr" value={data.customerAddr} onChange={handleChange} placeholder="Address" className={inputClass} />
            <input name="customerPhone" value={data.customerPhone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
            <input name="buyerGst" value={data.buyerGst} onChange={handleChange} placeholder="GSTIN" className={inputClass} />
          </div>

          {/* Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-gray-700 dark:text-gray-200">Items List</h3>
              <button onClick={addItem} className="flex items-center text-xs bg-accent text-white px-3 py-1 rounded hover:bg-primary transition"><Plus className="w-3 h-3 mr-1" /> Add Item</button>
            </div>
            {data.items.map((item, index) => (
              <div key={item.id} className="bg-gray-50/50 dark:bg-gray-700/50 p-3 rounded border border-gray-200/50 dark:border-gray-600/50 mb-2 group hover:border-accent/50 transition-colors backdrop-blur-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Item {index + 1}</span>
                  <button onClick={() => removeItem(index)} className="text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3 h-3" /></button>
                </div>
                <textarea rows={3} value={item.desc} onChange={(e) => handleItemChange(index, 'desc', e.target.value)} placeholder="Description"
                  className={`${inputClass} mb-2 font-mono`} />
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <label className="text-[10px] uppercase font-bold text-gray-400">HSN/SAC</label>
                    <input list="hsn-codes" value={item.hsn || ''} onChange={(e) => handleItemChange(index, 'hsn', e.target.value)} className={inputClass} placeholder="Code" />
                  </div>
                  <div className="w-1/3">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Qty</label>
                    <input type="number" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} className={inputClass} />
                  </div>
                  <div className="w-1/3">
                    <label className="text-[10px] uppercase font-bold text-gray-400">{gstMode === 'inclusive' ? 'Total (Inc. Tax)' : 'Total (Exc. Tax)'}</label>
                    <input type="number" value={item.total} onChange={(e) => handleItemChange(index, 'total', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            ))}
            
            <datalist id="hsn-codes">
              <option value="999293">Commercial training and coaching services (18% GST)</option>
              <option value="999294">Other education and training services (18% GST)</option>
              <option value="998313">IT consulting and support services (18% GST)</option>
              <option value="998314">IT design and development services (18% GST)</option>
              <option value="998319">Other IT services (18% GST)</option>
            </datalist>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/20 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 transition-colors duration-300">
          <DownloadButton
            data={data}
            totals={downloadTotals}
            invNo={data.invNo}
            options={displayOptions}
          />
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="hidden md:flex flex-col w-[60%] h-full bg-gray-800 border-l border-gray-700">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Preview Mode</span>
          <div className="flex bg-gray-800 rounded p-1 border border-gray-700">
            <button
              type="button"
              onClick={() => setPreviewMode('html')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${previewMode === 'html' ? 'bg-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              ⚡ Live Paper (No Blink)
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('pdf')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${previewMode === 'pdf' ? 'bg-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              📄 PDF Viewer
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {previewMode === 'html' ? (
            <InvoiceHtmlPreview
              data={data}
              totals={downloadTotals}
              options={displayOptions}
            />
          ) : (
            <PDFViewer width="100%" height="100%" className="border-none w-full h-full" showToolbar={true}>
              <InvoiceDocument
                data={debouncedState.data}
                totals={previewTotals}
                options={debouncedState.displayOptions}
              />
            </PDFViewer>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ISOLATED DOWNLOAD BUTTON COMPONENT (No Blink / No Flash) ---
const DownloadButton = ({ data, totals, invNo, options }) => {
  const [instance, updateInstance] = usePDF({
    document: <InvoiceDocument data={data} totals={totals} options={options} />
  });

  // Debounce background PDF generation so it doesn't thrash while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      updateInstance(<InvoiceDocument data={data} totals={totals} options={options} />);
    }, 500);
    return () => clearTimeout(timer);
  }, [data, totals, options, updateInstance]);

  return (
    <a
      href={instance.url || '#'}
      download={`Invoice_${invNo || 'draft'}.pdf`}
      onClick={(e) => {
        if (!instance.url || instance.loading) {
          e.preventDefault();
          updateInstance(<InvoiceDocument data={data} totals={totals} options={options} />);
        }
      }}
      className="flex justify-center items-center w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer select-none"
    >
      <Download className={`mr-2 h-5 w-5 ${instance.loading ? 'animate-pulse opacity-75' : ''}`} />
      Download Final PDF
    </a>
  );
};

export default InvoiceGenerator;