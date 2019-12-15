export const getCarRequestStatusName = (statusType) => {
  const CarRequestStatusNames = {
    NEW: 'Новая',
    IN_PROGRESS: 'В работе',
    REJECTED: 'На доработку',
    COMPLETED: 'Завершена',
    AFFIRMATION: 'На утверждение',
    ASSIGNED: 'Назначен',
    CONFIRMED: 'Согласована',
    CONFIRMED_UDP_TO: 'Согласована УДП ТО',
    CANCELED: 'Заявки отменены',
    ACCEPTED: 'Принято',
    IN_PLACE: 'На месте',
    ON_THE_WAY: 'В пути',
  };

  const statusName = CarRequestStatusNames[statusType];
  if (statusName) {
    return statusName;
  }
};
