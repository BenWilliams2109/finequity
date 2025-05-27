const BusinessDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Visa Transaction Insights */}
      <Card title="Payment Trends">
        <VisaTransactionChart data={visaData} />
        <div className="mt-4">
          <Badge variant="success">+15% growth this quarter</Badge>
          <p className="text-sm text-gray-600">
            Consistent payment processing shows business stability
          </p>
        </div>
      </Card>
      
      {/* Alternative Data Score */}
      <Card title="Creditworthiness Score">
        <CircularProgress value={creditScore} />
        <div className="mt-4">
          <h4 className="font-medium">Improving Factors:</h4>
          <ul className="list-disc list-inside text-sm">
            <li>Regular Visa transactions (+20 points)</li>
            <li>Strong social media presence (+15 points)</li>
            <li>Community recommendations (+10 points)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};