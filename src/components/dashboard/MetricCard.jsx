const MetricCard = ({
  title,
  value,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  change,
  format = "number",
}) => (
  <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6 hover:bg-green-900/40 transition-colors">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-green-300 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">
          {format === "currency" ? "₱" : ""}
          {typeof value === "number" ? value.toLocaleString() : value}
          {format === "percentage" ? "%" : ""}
          {format === "time" ? " min" : ""}
        </p>
        {change && (
          <p
            className={`text-sm mt-1 ${
              change > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}% from yesterday
          </p>
        )}
      </div>
      <div className="bg-green-800/50 p-3 rounded-full">
        <Icon className="w-6 h-6 text-green-300" />
      </div>
    </div>
  </div>
);

export default MetricCard;
