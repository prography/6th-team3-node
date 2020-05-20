export function CamelToSentence(camel: string): string {
  const result = camel.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}
