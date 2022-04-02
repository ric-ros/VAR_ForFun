namespace VAR.Shared.LifeModels
{
    public class Cell
    {
        public int X { get; set; }
        public int Y { get; set; }
        public bool IsAlive;
        private bool IsAliveNext;

        public readonly List<Cell> neighbors = new();

        public Cell(int x, int y)
        {
            X = x;
            Y = y;
        }
        public void DetermineNextLiveState()
        {
            //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            //Any live cell with more than three live neighbours dies, as if by overpopulation.
            //Any live cell with two or three live neighbours lives on to the next generation.
            //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

            int liveNeighbors = neighbors
                .Where(x => x.IsAlive)
                .Count();

            if (IsAlive)
                IsAliveNext = liveNeighbors == 2 || liveNeighbors == 3;
            else
                IsAliveNext = liveNeighbors == 3;

        }

        public void Advance()
        {
            IsAlive = IsAliveNext;
        }
    }

}