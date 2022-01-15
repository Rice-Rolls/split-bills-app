const addFloatValue = (value1: number, value2: number) => {
  let times = Math.max(`${value1}`.split('.')[1]?.length ?? 0, `${value2}`.split('.')[1]?.length ?? 0);
  if(times === 0) return value1 + value2;
  return Number((parseFloat(value1 as any) + parseFloat(value2 as any)).toFixed(times))
}

export const countBill = (bills: Record<string, number>, target?: string) => {
  const participants = Object.keys(bills)
  const debtors: string[] = [];
  const receivers: string[] = [];
  const currBills: Record<string, number> = {};
  const lastBills = [];
  const total = Object.values(bills).reduce((prev, curr) => addFloatValue(prev, curr), 0)

  const mean = Number((total / participants.length).toFixed(2));
  participants.map(item => {
    if(mean - bills[item] > 0) {
      debtors.push(item)
    } else {
      receivers.push(item)
    }
    currBills[item] = addFloatValue(mean, -bills[item]);
  })

  if(target) {
    debtors.map((debtor) => {
      const pay = currBills[debtor];
      lastBills.push({ debtor, pay, receiver: target})
      currBills[debtor] = 0;
      currBills[target] = addFloatValue(currBills[target], pay);
    })
    debtors.push(target)
  }

  while(receivers.length) {
      const receiver = receivers.pop() as string;
      if(receiver === target) continue;
      let receiverBill = currBills[receiver];
      let dIndex = 0;
      while(receiverBill < 0) {
          const debtor = debtors[dIndex];
          const debtorBill = currBills[debtor];
          let pay;
          if(debtorBill > 0) {
              if(debtorBill <= -receiverBill) {
                  pay = debtorBill
              } else {
                  pay = Math.abs(receiverBill)
              }
              currBills[debtor] = addFloatValue(currBills[debtor], -pay);
              receiverBill = addFloatValue(receiverBill, pay);
              lastBills.push({debtor, receiver, pay})
          }
          dIndex++;
      }
      currBills[receiver] = 0;
  }
  
  return lastBills;
}