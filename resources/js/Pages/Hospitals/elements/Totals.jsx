
export default function Totals({ processingDaysTotals }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount || 0);
    }

  return (
    <div className="mt-6">
        <table className="table table-fixed">
            <thead>
                <tr>
                    <th className="w-[80px] text-right">Totals:</th>
                    <th className="w-1/6 text-center">{formatCurrency(processingDaysTotals.overall.current)}</th>
                    <th className="ww-1/6 text-center">{formatCurrency(processingDaysTotals.overall.thirty_days)}</th>
                    <th className="ww-1/6 text-center">{formatCurrency(processingDaysTotals.overall.sixty_days)}</th>
                    <th className="ww-1/6 text-center">{formatCurrency(processingDaysTotals.overall.ninety_days)}</th>
                    <th className="ww-1/6 text-center">{formatCurrency(processingDaysTotals.overall.over_ninety)}</th>
                    <th className="ww-1/6 text-center">{formatCurrency(processingDaysTotals.overall.total)}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td className="text-center">Current</td>
                    <td className="text-center">1-30 Days</td>
                    <td className="text-center">31-60 Days</td>
                    <td className="text-center">61-90 Days</td>
                    <td className="text-center">91-over</td>
                    <td className="text-center">Grand Total</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
