export function stepLockMapText(text: string) {
  const t = text.toLowerCase();
  const emergency = [];
  const service = [];
  const problem = [];
  const local = [];

  const emergencyTerms = ['24/7','24 hour','emergency','mobile'];
  const serviceTerms = ['repair','install','service','replace','maintenance'];
  const problemTerms = ['not working','won\'t','broken','leak','won\'t start'];
  const localTerms = ['near me','\bin\s','\bcharlotte\b','\bnew york\b'];

  emergencyTerms.forEach(w => { if(t.includes(w)) emergency.push(w); });
  serviceTerms.forEach(w => { if(t.includes(w)) service.push(w); });
  problemTerms.forEach(w => { if(t.includes(w)) problem.push(w); });
  localTerms.forEach(w => { if(t.includes(w)) local.push(w); });

  return { emergency, service, problem, local };
}