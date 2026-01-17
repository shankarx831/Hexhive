import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
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

const COLOR_PRIMARY = '#004030';
const COLOR_ACCENT = '#4A9782';

const styles = StyleSheet.create({
  page: { padding: 30, paddingTop: 120, fontFamily: 'Helvetica', fontSize: 10, lineHeight: 1.2 },
  header: { position: 'absolute', top: 30, left: 30, right: 30, height: 90, flexDirection: 'row' },
  separator: { height: 2, backgroundColor: COLOR_PRIMARY, marginTop: 5, marginBottom: 15 },
  logoImage: { width: 70, height: 70, objectFit: 'contain', marginRight: 20 },
  titleSection: { flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' },
  companyName: { fontSize: 24, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', color: COLOR_PRIMARY, marginBottom: -1 },
  companyAddress: { fontSize: 9, color: '#444', textAlign: 'right', marginBottom: 2 },
  taxTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: COLOR_ACCENT, marginTop: 15, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', width: '100%' },
  metaContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 10 },
  metaGroup: { width: '48%' },
  row: { flexDirection: 'row', marginBottom: 4 },
  label: { width: 70, fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#555' },
  value: { flex: 1, fontSize: 9, fontFamily: 'Helvetica' },
  gstBar: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f9fafb', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, paddingHorizontal: 4, marginBottom: 10 },
  gstText: { fontSize: 9, color: '#333' },
  tableContainer: { marginTop: 0, borderWidth: 1, borderColor: '#e5e7eb' },
  tableHeader: { flexDirection: 'row', backgroundColor: COLOR_PRIMARY, color: 'white', height: 24, alignItems: 'center', textAlign: 'center', fontFamily: 'Helvetica-Bold', fontSize: 9 },
  col1: { width: '8%', borderRightWidth: 1, borderColor: '#e5e7eb', height: '100%', padding: 4 },
  col2: { width: '62%', borderRightWidth: 1, borderColor: '#e5e7eb', height: '100%', padding: 4, textAlign: 'left' },
  col3: { width: '12%', borderRightWidth: 1, borderColor: '#e5e7eb', height: '100%', padding: 4 },
  col4: { width: '18%', height: '100%', padding: 4, textAlign: 'right' },
  rowStyle: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', alignItems: 'flex-start', fontSize: 10, paddingVertical: 0 },
  footerSection: { flexDirection: 'row', borderTopWidth: 2, borderTopColor: COLOR_PRIMARY, paddingTop: 10, marginTop: 0 },
  footerLeft: { width: '60%', paddingRight: 20 },
  bankBox: { backgroundColor: '#f9fafb', padding: 8, borderRadius: 4, borderWidth: 1, borderColor: '#e5e7eb' },
  bankTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: COLOR_PRIMARY, marginBottom: 4, textTransform: 'uppercase' },
  bankText: { fontSize: 9, marginBottom: 2, color: '#333' },
  footerRight: { width: '40%' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  totalLabel: { fontFamily: 'Helvetica', fontSize: 10, color: '#555' },
  totalValue: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#000' },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLOR_PRIMARY, padding: 6, marginTop: 5, borderRadius: 2 },
  grandTotalText: { color: 'white', fontFamily: 'Helvetica-Bold', fontSize: 12 },
  signatureArea: { marginTop: 30, alignItems: 'flex-end', paddingRight: 10 }
});

const InvoiceDocument = ({ data, totals, options }) => {
  const halfRate = totals.gstRate / 2;
  // Construct absolute URL for the logo, compatible with local and production (GitHub Pages)
  const logoUrl = window.location.origin + (process.env.PUBLIC_URL || '') + '/favicon_transparent.png';

  // Fallback if options are undefined (prevents crash)
  const showBank = options?.showBankDetails !== false; // Default true
  const showGst = options?.showBuyerGst !== false;     // Default true

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header} fixed>
          <Image src={logoUrl} style={styles.logoImage} />
          <View style={styles.titleSection}>
            <Text style={styles.companyName}>HEXHIVE SOLUTIONS</Text>
            <Text style={{ ...styles.companyAddress, fontFamily: 'Helvetica-Bold' }}>Pondicherry - 605001,No.58, Canteen Street, First Floor</Text>
            <Text style={styles.companyAddress}>Ph: +91 9751 397500 | Email: contact@hexhive.solutions</Text>
            <Text style={styles.companyAddress}>GSTIN : 34AAAAA0000A1Z5   State Code : 34</Text>
          </View>
        </View>
        <Text style={styles.taxTitle}>TAX INVOICE</Text>
        <View style={styles.separator} />        <View style={styles.metaContainer}>
          <View style={styles.metaGroup}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: COLOR_PRIMARY, fontSize: 11, marginBottom: 5 }}>BILL TO:</Text>
            <View style={styles.row}><Text style={styles.label}>Name:</Text><Text style={styles.value}>{data.customerName}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Address:</Text><Text style={styles.value}>{data.customerAddr}</Text></View>

            {showGst && (
              <View style={styles.row}><Text style={styles.label}>GSTIN:</Text><Text style={styles.value}>{data.buyerGst}</Text></View>
            )}
          </View>
          <View style={styles.metaGroup}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: COLOR_PRIMARY, fontSize: 11, marginBottom: 5 }}>INVOICE DETAILS:</Text>
            <View style={styles.row}><Text style={styles.label}>Invoice No:</Text><Text style={styles.value}>{data.invNo}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Date:</Text><Text style={styles.value}>{data.date.split('-').reverse().join('.')} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Place of Supply:</Text><Text style={styles.value}>Pondicherry (34)</Text></View>
          </View>
        </View>

        <View style={styles.gstBar}>
          <View style={{ flexDirection: 'row' }}>
            {showGst ? (
              <>
                <Text style={styles.gstText}>Buyer GSTIN:  </Text>
                <Text style={{ ...styles.gstText, fontFamily: 'Helvetica-Bold' }}>{data.buyerGst}</Text>
              </>
            ) : (
              <Text style={styles.gstText}>Consumer Invoice</Text>
            )}
          </View>
          <View>
            <Text style={styles.gstText}>State Code: <Text style={{ fontFamily: 'Helvetica-Bold' }}>34</Text></Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Description</Text>
            <Text style={styles.col3}>Qty</Text>
            <Text style={styles.col4}>Amount</Text>
          </View>

          {data.items.map((item, idx) => (
            <View key={idx} style={styles.rowStyle}>
              <Text style={[styles.col1]}>{idx + 1}</Text>
              <Text style={[styles.col2]}>{item.desc}</Text>
              <Text style={[styles.col3, { textAlign: 'center' }]}>{item.qty}</Text>
              <Text style={[styles.col4]}>{Number(item.total).toLocaleString('en-IN')}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexGrow: 1 }} />

        <View style={styles.footerSection} wrap={false}>
          <View style={styles.footerLeft}>
            {showBank && (
              <View style={styles.bankBox}>
                <Text style={styles.bankTitle}>Bank Details</Text>
                <View style={styles.row}><Text style={styles.label}>Bank:</Text><Text style={styles.bankText}>Indian Bank</Text></View>
                <View style={styles.row}><Text style={styles.label}>A/C No:</Text><Text style={styles.bankText}>7894561230</Text></View>
                <View style={styles.row}><Text style={styles.label}>IFSC:</Text><Text style={styles.bankText}>IDIB000P042</Text></View>
                <View style={styles.row}><Text style={styles.label}>Branch:</Text><Text style={styles.bankText}>Pondicherry Main</Text></View>
              </View>
            )}
            <Text style={{ marginTop: 10, fontSize: 9, fontStyle: 'italic' }}>
              Amount in words: {numberToWords(totals.grandTotal)}
            </Text>
          </View>

          <View style={styles.footerRight}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Sub Total</Text>
              <Text style={styles.totalValue}>{totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>CGST ({halfRate}%)</Text>
              <Text style={styles.totalValue}>{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>SGST ({halfRate}%)</Text>
              <Text style={styles.totalValue}>{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotalText}>Rs. {totals.grandTotal.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.signatureArea} wrap={false}>
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: COLOR_PRIMARY }}>For HEXHIVE SOLUTIONS</Text>
          <View style={{ height: 40 }} />
          <Text style={{ fontSize: 8 }}>Authorized Signatory</Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoiceDocument;