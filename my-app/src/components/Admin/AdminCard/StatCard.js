const StatCard = ({ stat }) => {
  return (
    <div className="stat-card">
      <p>Nom: {stat.user.name}</p>
      <p>Pseudo: {stat.user.pseudo}</p>
      <p>
        Date du pari:{" "}
        {new Date(stat.userRankBet.createdAt).toLocaleDateString()}
      </p>
      <p>Pari: {stat.userRankBet.gain}</p>
      <p>Type de compétition: {stat.rankBet.competition}</p>
      {/* Ajoutez d'autres informations si nécessaire */}
      <table>
        <thead>
          <tr>
            <th>User Ranking</th>
            <th>Result Ranking</th>
          </tr>
        </thead>
        <tbody>
          {stat.userRankBet.userRanking.map((rank, index) => (
            <tr key={index}>
              <td>
                {rank.name} - {rank.position}
              </td>
              <td>
                {stat.userRankBet.resultRanking[index] ? (
                  <>
                    {stat.userRankBet.resultRanking[index].name} -{" "}
                    {stat.userRankBet.resultRanking[index].position}
                  </>
                ) : (
                  <span>En attente</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatCard;
