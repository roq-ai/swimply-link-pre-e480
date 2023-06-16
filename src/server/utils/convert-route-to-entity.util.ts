const mapping: Record<string, string> = {
  hosts: 'host',
  'preview-pages': 'preview_page',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
