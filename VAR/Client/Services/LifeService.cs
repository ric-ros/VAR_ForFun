using Blazor.Extensions.Canvas.Canvas2D;
using VAR.Shared.LifeModels;

namespace VAR.Client.Services
{
    public interface ILifeService
    {
        Task PrintCanvas(Canvas2DContext _ctx, Board board, int CellSize, long Width, long Heigth, string ElementColor, string BackgroundColor);
    }
    public class LifeService : ILifeService
    {
        public async Task PrintCanvas(Canvas2DContext _ctx, Board board, int CellSize, long Width, long Heigth, string ElementColor, string BackgroundColor)
        {
            await _ctx.BeginBatchAsync();

            foreach (var cell in board.Cells)
            {
                var (x, y) = (cell.X * CellSize, cell.Y * CellSize);
                if (cell.IsAlive)
                {
                    await _ctx.SetFillStyleAsync(ElementColor);
                    await _ctx.FillRectAsync(x, y, Width, Heigth);
                }
                else
                {
                    await _ctx.SetFillStyleAsync(BackgroundColor);
                    await _ctx.FillRectAsync(x, y, Width, Heigth);

                }
            }

            await _ctx.EndBatchAsync();
        }
    }
}
