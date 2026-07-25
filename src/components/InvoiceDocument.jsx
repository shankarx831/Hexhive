import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { numberToWords } from '../utils/invoiceUtils';

// Register standard fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfB.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfC.ttf', fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: 'Helvetica', fontSize: 8, lineHeight: 1.2 },
  title: { fontSize: 12, fontFamily: 'Helvetica-Bold', textAlign: 'center', marginBottom: 5 },
  box: { borderWidth: 1, borderColor: '#000', flexGrow: 1, display: 'flex', flexDirection: 'column' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' },
  colHalf: { width: '50%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  colHalfNoBorder: { width: '50%' },
  
  gridRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000', flexGrow: 1 },
  gridCell: { width: '50%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  gridCellLast: { width: '50%', padding: 4 },
  
  bold: { fontFamily: 'Helvetica-Bold' },
  
  // Table
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000', textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  th1: { width: '5%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  th2: { width: '45%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  th3: { width: '10%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  th4: { width: '10%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  th5: { width: '10%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  th6: { width: '5%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  th7: { width: '15%', padding: 4 },
  
  // Table Row
  tr: { flexDirection: 'row' },
  td1: { width: '5%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'center' },
  td2: { width: '45%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  td3: { width: '10%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'center' },
  td4: { width: '10%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'center' },
  td5: { width: '10%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'right' },
  td6: { width: '5%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'center' },
  td7: { width: '15%', padding: 4, textAlign: 'right' },
  tdGst: { width: '80%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'right', fontFamily: 'Helvetica-Bold', fontStyle: 'italic', paddingRight: 12 },
  
  // Table Fill (to stretch the borders to bottom)
  tableFill: { flexDirection: 'row', flexGrow: 1, borderBottomWidth: 1, borderColor: '#000' },
  tf1: { width: '5%', borderRightWidth: 1, borderColor: '#000' },
  tf2: { width: '45%', borderRightWidth: 1, borderColor: '#000' },
  tf3: { width: '10%', borderRightWidth: 1, borderColor: '#000' },
  tf4: { width: '10%', borderRightWidth: 1, borderColor: '#000' },
  tf5: { width: '10%', borderRightWidth: 1, borderColor: '#000' },
  tf6: { width: '5%', borderRightWidth: 1, borderColor: '#000' },
  tf7: { width: '15%' },

  // Tax Table
  taxTableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' },
  taxTh1: { width: '25%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  taxTh2: { width: '15%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'right', fontFamily: 'Helvetica-Bold' },
  taxTh3: { width: '20%', borderRightWidth: 1, borderColor: '#000' },
  taxTh5: { width: '20%', padding: 4, textAlign: 'right', fontFamily: 'Helvetica-Bold', alignSelf: 'center' },
  
  taxTd1: { width: '25%', borderRightWidth: 1, borderColor: '#000', padding: 4 },
  taxTd2: { width: '15%', borderRightWidth: 1, borderColor: '#000', padding: 4, textAlign: 'right' },
  taxTd3: { width: '20%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row' },
  taxTd5: { width: '20%', padding: 4, textAlign: 'right' },
  
  taxSubTh: { borderBottomWidth: 1, borderColor: '#000', width: '100%', textAlign: 'center', paddingVertical: 2, fontFamily: 'Helvetica-Bold' },
  taxSubThRow: { flexDirection: 'row', flexGrow: 1 },
  taxSubThRate: { width: '40%', borderRightWidth: 1, borderColor: '#000', textAlign: 'center', paddingVertical: 2, fontFamily: 'Helvetica-Bold' },
  taxSubThAmt: { width: '60%', textAlign: 'center', paddingVertical: 2, fontFamily: 'Helvetica-Bold' },
  
  taxSubTdRate: { width: '40%', borderRightWidth: 1, borderColor: '#000', textAlign: 'center', padding: 4 },
  taxSubTdAmt: { width: '60%', textAlign: 'right', padding: 4 },
});

const InvoiceDocument = ({ data, totals, options }) => {
  const halfRate = totals.gstRate / 2;
  const showBank = options?.showBankDetails !== false;
  const showGst = options?.showBuyerGst !== false;

  const totalQty = data.items.reduce((acc, item) => acc + Number(item.qty || 0), 0);
  const primaryHsn = data.items.length > 0 ? (data.items[0].hsn || '') : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Tax Invoice</Text>
        
        <View style={styles.box}>
          {/* Row 1: Seller Info & Invoice Meta */}
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.bold}>HEXHIVE SOLUTIONS</Text>
              <Text>First Floor, No. 58, Canteen Street, Heritage Town,</Text>
              <Text>Puducherry, Puducherry, 605001</Text>
              <Text>GSTIN/UIN : 34HYFPK1653H1ZE</Text>
              <Text>State Name : Puducherry, Code : 34</Text>
              <Text>Contact : +91 9751 397500</Text>
              <Text>E-Mail : contact@hexhivesolutions.com</Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <View style={styles.gridRow}>
                <View style={styles.gridCell}>
                  <Text>Invoice No.</Text>
                  <Text style={styles.bold}>{data.invNo}</Text>
                </View>
                <View style={styles.gridCellLast}>
                  <Text>Dated</Text>
                  <Text style={styles.bold}>{data.date ? data.date.split('-').reverse().join('-') : ''}</Text>
                </View>
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridCell}>
                  <Text>Delivery Note</Text>
                </View>
                <View style={styles.gridCellLast}>
                  <Text>Mode/Terms of Payment</Text>
                </View>
              </View>
              <View style={[styles.gridRow, { borderBottomWidth: 0 }]}>
                <View style={styles.gridCell}>
                  <Text>Reference No. &amp; Date.</Text>
                </View>
                <View style={styles.gridCellLast}>
                  <Text>Other References</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Row 2: Buyer Info & Delivery Meta */}
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text>Buyer (Bill to)</Text>
              <Text style={styles.bold}>{data.customerName}</Text>
              <Text>{data.customerAddr}</Text>
              {data.customerPhone ? <Text>Contact : {data.customerPhone}</Text> : null}
              {showGst && data.buyerGst ? <Text>GSTIN/UIN : {data.buyerGst}</Text> : null}
              {showGst && data.buyerGst ? <Text>State Name : Puducherry, Code : 34</Text> : null}
            </View>
            <View style={styles.colHalfNoBorder}>
              <View style={styles.gridRow}>
                <View style={styles.gridCell}>
                  <Text>Buyer's Order No.</Text>
                </View>
                <View style={styles.gridCellLast}>
                  <Text>Dated</Text>
                </View>
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridCell}>
                  <Text>Dispatch Doc No.</Text>
                </View>
                <View style={styles.gridCellLast}>
                  <Text>Delivery Note Date</Text>
                </View>
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridCell}>
                  <Text>Dispatched through</Text>
                </View>
                <View style={styles.gridCellLast}>
                  <Text>Destination</Text>
                </View>
              </View>
              <View style={[styles.gridRow, { borderBottomWidth: 0 }]}>
                <View style={{ padding: 4 }}>
                  <Text>Terms of Delivery</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.th1}>SI{'\n'}No.</Text>
            <Text style={styles.th2}>Description of Goods</Text>
            <Text style={styles.th3}>HSN/SAC</Text>
            <Text style={styles.th4}>Quantity</Text>
            <Text style={styles.th5}>Rate</Text>
            <Text style={styles.th6}>per</Text>
            <Text style={styles.th7}>Amount</Text>
          </View>

          {/* Table Items */}
          {data.items.map((item, idx) => {
             const rawTotal = Number(item.total || 0);
             const itemAmount = (totals.mode === 'inclusive' && totals.gstRate > 0)
               ? (rawTotal / (1 + totals.gstRate / 100))
               : rawTotal;
             const qty = Number(item.qty || 1);
             const rate = qty > 0 ? (itemAmount / qty) : itemAmount;
             return (
              <View key={idx} style={styles.tr}>
                <Text style={styles.td1}>{idx + 1}</Text>
                <Text style={[styles.td2, styles.bold]}>{item.desc}</Text>
                <Text style={styles.td3}>{item.hsn}</Text>
                <Text style={[styles.td4, styles.bold]}>{item.qty} NOS</Text>
                <Text style={styles.td5}>{rate.toFixed(2)}</Text>
                <Text style={styles.td6}>NOS</Text>
                <Text style={[styles.td7, styles.bold]}>{itemAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
             );
          })}
          
          {/* GST lines inside the table with 7 aligned columns */}
          {totals.igst > 0 ? (
            <View style={styles.tr}>
              <Text style={styles.td1}></Text>
              <Text style={[styles.td2, styles.bold, { textAlign: 'right', fontStyle: 'italic' }]}>IGST OUTPUT</Text>
              <Text style={styles.td3}></Text>
              <Text style={styles.td4}></Text>
              <Text style={styles.td5}></Text>
              <Text style={styles.td6}></Text>
              <Text style={[styles.td7, styles.bold]}>{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </View>
          ) : (totals.cgst > 0 && (
            <>
              <View style={styles.tr}>
                <Text style={styles.td1}></Text>
                <Text style={[styles.td2, styles.bold, { textAlign: 'right', fontStyle: 'italic' }]}>CGST OUTPUT</Text>
                <Text style={styles.td3}></Text>
                <Text style={styles.td4}></Text>
                <Text style={styles.td5}></Text>
                <Text style={styles.td6}></Text>
                <Text style={[styles.td7, styles.bold]}>{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
              <View style={styles.tr}>
                <Text style={styles.td1}></Text>
                <Text style={[styles.td2, styles.bold, { textAlign: 'right', fontStyle: 'italic' }]}>SGST OUTPUT</Text>
                <Text style={styles.td3}></Text>
                <Text style={styles.td4}></Text>
                <Text style={styles.td5}></Text>
                <Text style={styles.td6}></Text>
                <Text style={[styles.td7, styles.bold]}>{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
            </>
          ))}

          <View style={styles.tableFill}>
            <View style={styles.tf1}></View>
            <View style={styles.tf2}></View>
            <View style={styles.tf3}></View>
            <View style={styles.tf4}></View>
            <View style={styles.tf5}></View>
            <View style={styles.tf6}></View>
            <View style={styles.tf7}></View>
          </View>

          {/* Table Totals */}
          <View style={styles.row}>
            <Text style={styles.td1}></Text>
            <Text style={[styles.td2, styles.bold, { textAlign: 'right' }]}>Total</Text>
            <Text style={styles.td3}></Text>
            <Text style={[styles.td4, styles.bold]}>{totalQty} NOS</Text>
            <Text style={styles.td5}></Text>
            <Text style={styles.td6}></Text>
            <Text style={[styles.td7, styles.bold]}>₹{totals.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>

          {/* Amount in words */}
          <View style={[styles.row, { padding: 4, flexDirection: 'column' }]}>
            <Text>Amount Chargeable (in words)</Text>
            <Text style={[styles.bold, { marginTop: 2 }]}>RUPEES {numberToWords(totals.grandTotal).toUpperCase()} ONLY</Text>
          </View>

          {/* Tax Table */}
          {totals.igst > 0 ? (
            <>
              <View style={styles.taxTableHeader}>
                <Text style={styles.taxTh1}>HSN/SAC</Text>
                <Text style={styles.taxTh2}>Taxable{'\n'}Value</Text>
                <View style={[styles.taxTh3, { width: '46%' }]}>
                  <Text style={styles.taxSubTh}>Integrated Tax</Text>
                  <View style={styles.taxSubThRow}>
                    <Text style={styles.taxSubThRate}>Rate</Text>
                    <Text style={styles.taxSubThAmt}>Amount</Text>
                  </View>
                </View>
                <Text style={styles.taxTh5}>Total{'\n'}Tax Amount</Text>
              </View>
              
              <View style={styles.tr}>
                <Text style={styles.taxTd1}>{primaryHsn}</Text>
                <Text style={styles.taxTd2}>{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                <View style={[styles.taxTd3, { width: '46%' }]}>
                  <Text style={styles.taxSubTdRate}>{totals.gstRate}%</Text>
                  <Text style={styles.taxSubTdAmt}>{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <Text style={styles.taxTd5}>{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>

              {/* Tax Totals Row */}
              <View style={[styles.tr, { borderBottomWidth: 1, borderColor: '#000' }]}>
                <Text style={[styles.taxTd1, styles.bold, { textAlign: 'right' }]}>Total</Text>
                <Text style={[styles.taxTd2, styles.bold]}>{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                <View style={[styles.taxTd3, { width: '46%' }]}>
                  <Text style={styles.taxSubTdRate}></Text>
                  <Text style={[styles.taxSubTdAmt, styles.bold]}>{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <Text style={[styles.taxTd5, styles.bold]}>{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.taxTableHeader}>
                <Text style={styles.taxTh1}>HSN/SAC</Text>
                <Text style={styles.taxTh2}>Taxable{'\n'}Value</Text>
                <View style={styles.taxTh3}>
                  <Text style={styles.taxSubTh}>Central Tax</Text>
                  <View style={styles.taxSubThRow}>
                    <Text style={styles.taxSubThRate}>Rate</Text>
                    <Text style={styles.taxSubThAmt}>Amount</Text>
                  </View>
                </View>
                <View style={styles.taxTh3}>
                  <Text style={styles.taxSubTh}>State Tax</Text>
                  <View style={styles.taxSubThRow}>
                    <Text style={styles.taxSubThRate}>Rate</Text>
                    <Text style={styles.taxSubThAmt}>Amount</Text>
                  </View>
                </View>
                <Text style={styles.taxTh5}>Total{'\n'}Tax Amount</Text>
              </View>
              
              <View style={styles.tr}>
                <Text style={styles.taxTd1}>{primaryHsn}</Text>
                <Text style={styles.taxTd2}>{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                <View style={styles.taxTd3}>
                  <Text style={styles.taxSubTdRate}>{halfRate}%</Text>
                  <Text style={styles.taxSubTdAmt}>{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <View style={styles.taxTd3}>
                  <Text style={styles.taxSubTdRate}>{halfRate}%</Text>
                  <Text style={styles.taxSubTdAmt}>{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <Text style={styles.taxTd5}>{(totals.cgst + totals.sgst).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>

              {/* Tax Totals Row */}
              <View style={[styles.tr, { borderBottomWidth: 1, borderColor: '#000' }]}>
                <Text style={[styles.taxTd1, styles.bold, { textAlign: 'right' }]}>Total</Text>
                <Text style={[styles.taxTd2, styles.bold]}>{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                <View style={styles.taxTd3}>
                  <Text style={styles.taxSubTdRate}></Text>
                  <Text style={[styles.taxSubTdAmt, styles.bold]}>{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <View style={styles.taxTd3}>
                  <Text style={styles.taxSubTdRate}></Text>
                  <Text style={[styles.taxSubTdAmt, styles.bold]}>{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <Text style={[styles.taxTd5, styles.bold]}>{(totals.cgst + totals.sgst).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
            </>
          )}

          {/* Tax Amount in words */}
          <View style={[styles.row, { padding: 4 }]}>
            <Text>Tax Amount (in words) : <Text style={styles.bold}>RUPEES {numberToWords(Math.round(totals.totalTax || (totals.cgst + totals.sgst + (totals.igst || 0)))).toUpperCase()} ONLY</Text></Text>
          </View>

          {/* Footer Info */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.colHalf, { borderRightWidth: 1, borderColor: '#000', padding: 4, display: 'flex', flexDirection: 'column' }]}>
              <Text style={{ marginBottom: 15 }}>Company's PAN : <Text style={styles.bold}>HYFPK1653H</Text></Text>
              <Text style={{ textDecoration: 'underline' }}>Declaration</Text>
              <Text>We declare that this invoice shows the actual price of the</Text>
              <Text>goods described and that all particulars are true and correct.</Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              {showBank ? (
                <View style={{ borderBottomWidth: 1, borderColor: '#000', padding: 4 }}>
                  <Text style={[styles.bold, { textDecoration: 'underline', marginBottom: 2 }]}>Company's Bank Details</Text>
                  <View style={{ flexDirection: 'row' }}><Text style={{ width: 85 }}>Bank Name</Text><Text style={styles.bold}>: Axis Bank</Text></View>
                  <View style={{ flexDirection: 'row' }}><Text style={{ width: 85 }}>A/c No.</Text><Text style={styles.bold}>: 926020005853817</Text></View>
                  <View style={{ flexDirection: 'row' }}><Text style={{ width: 85 }}>Branch</Text><Text style={styles.bold}>: PONDICHERRY MAIN BRANCH</Text></View>
                  <View style={{ flexDirection: 'row' }}><Text style={{ width: 85 }}>IFS Code</Text><Text style={styles.bold}>: UTIB0000209</Text></View>
                  <View style={{ flexDirection: 'row' }}><Text style={{ width: 85 }}>SWIFT Code</Text><Text style={styles.bold}>: AXISINBBA19</Text></View>
                </View>
              ) : (
                <View style={{ borderBottomWidth: 1, borderColor: '#000', padding: 4 }}>
                </View>
              )}
              <View style={{ padding: 4 }}>
                <Text style={[styles.bold, { textAlign: 'right' }]}>for HEXHIVE SOLUTIONS</Text>
                <Text style={{ textAlign: 'right', marginTop: 35 }}>Authorised Signatory</Text>
              </View>
            </View>
          </View>
          
        </View>
        <Text style={{ textAlign: 'center', marginTop: 5 }}>This is a Computer Generated Invoice</Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;