import NP from 'number-precision';

export const countBill = (bills: Record<string, number>, target?: string) => {
  const participants = Object.keys(bills)
  const debtors: string[] = [];
  const receivers: string[] = [];
  const currBills: Record<string, number> = {};
  const lastBills = [];
  const total = Object.values(bills).reduce((prev, curr) => NP.plus(prev, curr), 0)

  const mean = Number((total / participants.length).toFixed(2));
  participants.map(item => {
    if(mean - bills[item] > 0) {
      debtors.push(item)
    } else {
      receivers.push(item)
    }
    currBills[item] = NP.plus(mean, -bills[item]);
  })

  if(target) {
    debtors.map((debtor) => {
      const pay = currBills[debtor];
      lastBills.push({ debtor, pay, receiver: target})
      currBills[debtor] = 0;
      currBills[target] = NP.plus(currBills[target], pay);
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
              currBills[debtor] = NP.plus(currBills[debtor], -pay);
              receiverBill = NP.plus(receiverBill, pay);
              lastBills.push({debtor, receiver, pay})
          }
          dIndex++;
      }
      currBills[receiver] = 0;
  }
  
  return lastBills;
}