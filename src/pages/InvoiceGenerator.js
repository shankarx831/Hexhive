import React, { useState, useEffect, useMemo } from 'react';
import { PDFViewer, usePDF } from '@react-pdf/renderer';
import InvoiceDocument from '../components/InvoiceDocument';
import { FileText, Download, Plus, Trash2, Settings, Eye, EyeOff } from 'lucide-react';

const InvoiceGenerator = () => {
  const [gstMode, setGstMode] = useState('inclusive');
  const [gstRate, setGstRate] = useState(18);

  const [displayOptions, setDisplayOptions] = useState({
    showBankDetails: true,
    showBuyerGst: true,
  });

  const [data, setData] = useState({
    invNo: '208',
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    customerAddr: '',
    buyerGst: '',
    items: [
      { id: 1, desc: 'Web Development Services', qty: 1, total: 1000 }
    ]
  });

  // --- DEBOUNCED STATE FOR PDF RENDERING ---
  const [debouncedState, setDebouncedState] = useState({
    data,
    gstMode,
    gstRate,
    displayOptions
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState({ data, gstMode, gstRate, displayOptions });
    }, 800); // 800ms delay to stop flickering while typing
    return () => clearTimeout(timer);
  }, [data, gstMode, gstRate, displayOptions]);

  // --- HANDLERS ---
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData({ ...data, items: newItems });
  };

  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), desc: '', qty: '', total: 0 }] });

  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems });
  };

  const toggleOption = (key) => {
    setDisplayOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotals = (items, mode, rate) => {
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
    return { subTotal, cgst: taxAmount / 2, sgst: taxAmount / 2, grandTotal, gstRate: rate };
  };

  // Calculate totals for Live Preview (Debounced)
  const previewTotals = useMemo(() =>
    calculateTotals(debouncedState.data.items, debouncedState.gstMode, debouncedState.gstRate),
    [debouncedState]
  );

  // Calculate totals for Download Button (Instant)
  const downloadTotals = calculateTotals(data.items, gstMode, gstRate);

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-md text-sm transition-all focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

  return (
    // Adjusted height to account for Navbar (h-20 = 5rem)
    <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] font-sans bg-cream overflow-hidden">

      {/* LEFT: FORM */}
      <div className="w-full md:w-[40%] bg-white border-r shadow-xl z-10 flex flex-col h-full">
        <div className="p-4 border-b bg-primary flex justify-between items-center text-white">
          <h2 className="text-xl font-heading font-bold flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Invoice Generator
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* Display Settings */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
            <h3 className="text-xs font-bold text-primary mb-3 uppercase tracking-wide flex items-center">
              <Settings className="w-3 h-3 mr-1" /> Display Settings
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => toggleOption('showBankDetails')}
                type="button"
                className={`flex items-center px-3 py-2 rounded text-xs font-medium border transition-colors ${displayOptions.showBankDetails ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
              >
                {displayOptions.showBankDetails ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                Bank Details
              </button>
              <button
                onClick={() => toggleOption('showBuyerGst')}
                type="button"
                className={`flex items-center px-3 py-2 rounded text-xs font-medium border transition-colors ${displayOptions.showBuyerGst ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
              >
                {displayOptions.showBuyerGst ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                Buyer GST
              </button>
            </div>
          </div>

          {/* Tax Settings */}
          <div className="bg-cream p-4 rounded-lg border border-accent/20 mb-6">
            <h3 className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">Tax Settings</h3>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center cursor-pointer">
                <input type="radio" checked={gstMode === 'inclusive'} onChange={() => setGstMode('inclusive')} className="mr-2 accent-primary" />
                <span className="text-sm font-medium text-gray-700 ml-2">Inclusive GST</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" checked={gstMode === 'exclusive'} onChange={() => setGstMode('exclusive')} className="mr-2 accent-primary" />
                <span className="text-sm font-medium text-gray-700 ml-2">Exclusive GST</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">GST Slab:</span>
              {[0, 5, 12, 18].map(rate => (
                <button key={rate} onClick={() => setGstRate(rate)}
                  className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${gstRate === rate ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Inv. No</label>
              <input name="invNo" value={data.invNo} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
              <input type="date" name="date" value={data.date} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <input name="customerName" value={data.customerName} onChange={handleChange} placeholder="Customer Name" className={inputClass} />
            <input name="customerAddr" value={data.customerAddr} onChange={handleChange} placeholder="Address" className={inputClass} />
            <input name="buyerGst" value={data.buyerGst} onChange={handleChange} placeholder="GSTIN" className={inputClass} />
          </div>

          {/* Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-gray-700">Items List</h3>
              <button onClick={addItem} className="flex items-center text-xs bg-accent text-white px-3 py-1 rounded hover:bg-primary transition"><Plus className="w-3 h-3 mr-1" /> Add Item</button>
            </div>
            {data.items.map((item, index) => (
              <div key={item.id} className="bg-gray-50 p-3 rounded border border-gray-200 mb-2 group hover:border-accent/50 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Item {index + 1}</span>
                  <button onClick={() => removeItem(index)} className="text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3 h-3" /></button>
                </div>
                <textarea rows={3} value={item.desc} onChange={(e) => handleItemChange(index, 'desc', e.target.value)} placeholder="Description"
                  className={`${inputClass} mb-2 font-mono`} />
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Qty</label>
                    <input type="number" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} className={inputClass} />
                  </div>
                  <div className="w-2/3">
                    <label className="text-[10px] uppercase font-bold text-gray-400">{gstMode === 'inclusive' ? 'Total (Inc. Tax)' : 'Price (Exc. Tax)'}</label>
                    <input type="number" value={item.total} onChange={(e) => handleItemChange(index, 'total', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-white">
          <DownloadButton
            data={data}
            totals={downloadTotals}
            invNo={data.invNo}
            options={displayOptions}
          />
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW (Uses PDFViewer directly to avoid crashes) */}
      <div className="hidden md:block w-[60%] h-full bg-gray-800">
        <PDFViewer width="100%" height="100%" className="border-none w-full h-full" showToolbar={true}>
          <InvoiceDocument
            data={debouncedState.data}
            totals={previewTotals}
            options={debouncedState.displayOptions}
          />
        </PDFViewer>
      </div>
    </div>
  );
};

// --- ISOLATED DOWNLOAD BUTTON COMPONENT ---
const DownloadButton = ({ data, totals, invNo, options }) => {
  const [instance, updateInstance] = usePDF({
    document: <InvoiceDocument data={data} totals={totals} options={options} />
  });

  // Force update when data changes
  useEffect(() => {
    updateInstance();
  }, [data, totals, options, updateInstance]);

  if (instance.loading) {
    return <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-3 rounded-lg cursor-wait">Preparing PDF...</button>;
  }

  if (instance.error) {
    return <button disabled className="w-full bg-red-100 text-red-500 font-bold py-3 rounded-lg">Error Generating PDF</button>;
  }

  return (
    <a href={instance.url} download={`Invoice_${invNo}.pdf`}
      className="flex justify-center items-center w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
      <Download className="mr-2 h-5 w-5" /> Download Final PDF
    </a>
  );
};

export default InvoiceGenerator;