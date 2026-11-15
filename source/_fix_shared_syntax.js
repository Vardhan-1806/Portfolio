// Fix shared.js syntax error: escape ${} inside REAL_STACK_EXAMPLES code strings
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'shared.js');
let src = fs.readFileSync(filePath, 'utf-8');

// Fix line 555: await api.post(`/posts/${postId}/like`);
src = src.replace(
  "await api.post(`/posts/${postId}/like`);",
  "await api.post(\\`/posts/\\${postId}/like\\`);"
);

// Fix line 558-559: rollback block with ${postId}
src = src.replace(
  "p._id === postId ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount + 1 : p.likesCount - 1 } : p",
  "p._id === postId ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount + 1 : p.likesCount - 1 } : p"
);

// Fix line 587: socket.join(`trip_${tripId}`)
src = src.replace(
  "socket.join(`trip_${tripId}`)",
  "socket.join(\\`trip_\\${tripId}\\`)"
);

// Fix line 589: io.to(`trip_${data.tripId}`).emit(...)
src = src.replace(
  "io.to(`trip_${data.tripId}`).emit('receive_message', data);",
  "io.to(\\`trip_\\${data.tripId}\\`).emit('receive_message', data);"
);

// Fix lines 668-670: ${{ secrets.* }} in YAML
src = src.replace(
  "vercel-token: ${{ secrets.VERCEL_TOKEN }}",
  "vercel-token: \\${{ secrets.VERCEL_TOKEN }}"
);
src = src.replace(
  "vercel-org-id: ${{ secrets.ORG_ID }}",
  "vercel-org-id: \\${{ secrets.ORG_ID }}"
);
src = src.replace(
  "vercel-project-id: ${{ secrets.PROJECT_ID }}",
  "vercel-project-id: \\${{ secrets.PROJECT_ID }}"
);

fs.writeFileSync(filePath, src, 'utf-8');
console.log('Patched shared.js');
