import "./Avatar.css";

export const Avatar = ({ fullName }: { fullName: string }) => {
  console.log({ fullName });

  return (
    <div className="tooltip circleWithText">
      {fullName[0].toUpperCase()}

      <span className="tooltiptext">{fullName}</span>
    </div>
  );
};
